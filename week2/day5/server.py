from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import List, Optional
import uvicorn
from contextlib import contextmanager

from menu_item import MenuItem
from menu_manager import MenuManager

app = FastAPI(title="Menu Management API")

DB_CONFIG = {
    "host": "localhost",
    "user": "superuser",
    "password": "aza",
    "dbname": "newdb"
}

class MenuItemCreate(BaseModel):
    """
    Schema for creating a new menu item.
    
    Attributes:
        name: The name of the menu item
        price: The price of the menu item in currency units
    """
    name: str
    price: float

class MenuItemUpdate(BaseModel):
    """
    Schema for updating an existing menu item.
    
    Attributes:
        name: Optional new name for the menu item
        price: Optional new price for the menu item in currency units
    """
    name: Optional[str] = None
    price: Optional[float] = None

class MenuItemResponse(BaseModel):
    """
    Schema for menu item responses from the API.
    
    Attributes:
        id: Unique identifier for the menu item
        name: The name of the menu item
        price: The price of the menu item in currency units
    """
    id: int
    name: str
    price: float

@contextmanager
def get_db_connection():
    """
    Context manager that establishes a database connection and ensures it's properly closed.
    
    Yields:
        A PostgreSQL connection object with RealDictCursor factory enabled
    """
    conn = psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)
    try:
        yield conn
    finally:
        conn.close()

def get_connection():
    """
    FastAPI dependency that provides a database connection to route handlers.
    
    Yields:
        A PostgreSQL connection object from the connection pool
    """
    with get_db_connection() as conn:
        yield conn

def format_menu_item(item):
    """
    Converts various menu item representations to a consistent dictionary format.
    
    This function handles both dictionary-like objects (such as RealDictRow from PostgreSQL)
    and MenuItem class instances, providing a unified interface for the API responses.
    
    Args:
        item: A menu item object, either a dict-like object or MenuItem instance
        
    Returns:
        dict: A standardized dictionary with id, name, and price fields
    """
    print(f"Item type: {type(item)}, Content: {item}")
    
    if hasattr(item, '__getitem__'):
        if isinstance(item, dict) or hasattr(item, 'keys'):
            print(f"Available keys: {list(item.keys())}")
        
        id_value = None
        for id_key in ['id', 'ID', 'menu_id', 'menuitem_id', 'item_id']:
            if id_key in item:
                id_value = item[id_key]
                break
        
        if id_value is None:
            id_value = 0
            print(f"Warning: No ID field found in {item}")
        
        name_value = item.get('name', item.get('item_name', item.get('menu_name', 'Unknown')))
        price_value = item.get('price', item.get('item_price', 0.0))
        
        return {
            "id": id_value,
            "name": name_value,
            "price": float(price_value) if price_value is not None else 0.0
        }
    else:
        return {
            "id": getattr(item, 'id', 0),
            "name": getattr(item, 'name', 'Unknown'),
            "price": float(getattr(item, 'price', 0.0))
        }

@app.get("/")
def read_root():
    """
    Root endpoint that confirms the API is running.
    
    Returns:
        dict: A simple message indicating the API is available
    """
    return {"message": "Menu Management API"}

@app.get("/menu", response_model=List[MenuItemResponse])
def get_all_menu_items(conn = Depends(get_connection)):
    """
    Retrieves all menu items from the database.
    
    Args:
        conn: Database connection provided by dependency injection
        
    Returns:
        list: A list of menu items formatted according to MenuItemResponse schema
    """
    manager = MenuManager()
    items = manager.all_items(conn)
    
    print(f"Items type: {type(items)}")
    if items and len(items) > 0:
        print(f"First item type: {type(items[0])}")
    
    result = []
    for item in items:
        try:
            formatted_item = format_menu_item(item)
            result.append(formatted_item)
        except Exception as e:
            print(f"Error formatting item {item}: {str(e)}")
    
    return result

@app.get("/menu/{item_name}", response_model=MenuItemResponse)
def get_menu_item_by_name(item_name: str, conn = Depends(get_connection)):
    """
    Retrieves a specific menu item by its name.
    
    Args:
        item_name: The name of the menu item to retrieve
        conn: Database connection provided by dependency injection
        
    Returns:
        dict: The menu item data formatted according to MenuItemResponse schema
        
    Raises:
        HTTPException: 404 error if the item is not found
    """
    manager = MenuManager()
    item = manager.get_by_name(conn, item_name)
    if not item:
        raise HTTPException(status_code=404, detail=f"Menu item '{item_name}' not found")
    return format_menu_item(item)

@app.post("/menu", response_model=MenuItemResponse, status_code=201)
def create_menu_item(item_data: MenuItemCreate, conn = Depends(get_connection)):
    """
    Creates a new menu item in the database.
    
    Args:
        item_data: The menu item data validated against MenuItemCreate schema
        conn: Database connection provided by dependency injection
        
    Returns:
        dict: The created menu item with its assigned ID
        
    Raises:
        HTTPException: 400 error if creation fails
        HTTPException: 500 error if the item was saved but cannot be retrieved
    """
    try:
        new_item = MenuItem(item_data.name, item_data.price)
        new_item.save(conn)
        saved_item = MenuManager().get_by_name(conn, item_data.name)
        if not saved_item:
            raise HTTPException(status_code=500, detail="Item was saved but cannot be retrieved")
        return format_menu_item(saved_item)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/menu/{item_name}", response_model=MenuItemResponse)
def update_menu_item(item_name: str, item_data: MenuItemUpdate, conn = Depends(get_connection)):
    """
    Updates an existing menu item.
    
    Currently only supports updating the price of an item.
    
    Args:
        item_name: The name of the menu item to update
        item_data: The update data validated against MenuItemUpdate schema
        conn: Database connection provided by dependency injection
        
    Returns:
        dict: The updated menu item data
        
    Raises:
        HTTPException: 404 error if the item is not found
        HTTPException: 400 error if attempting to change the item name
        HTTPException: 500 error if the item was updated but cannot be retrieved
    """
    manager = MenuManager()
    item = manager.get_by_name(conn, item_name)
    if not item:
        raise HTTPException(status_code=404, detail=f"Menu item '{item_name}' not found")
    
    if item_data.price is not None:
        if hasattr(item, '__getitem__'):
            menu_item = MenuItem(item['name'], item['price'])
            menu_item.id = item['id']
            menu_item.update(conn, new_price=item_data.price)
        else:
            item.update(conn, new_price=item_data.price)
            
    if item_data.name is not None and item_data.name != item_name:
        raise HTTPException(status_code=400, detail="Changing item name is not supported")
    
    updated_item = manager.get_by_name(conn, item_name)
    if not updated_item:
        raise HTTPException(status_code=500, detail="Item was updated but cannot be retrieved")
    return format_menu_item(updated_item)

@app.delete("/menu/{item_name}", status_code=204)
def delete_menu_item(item_name: str, conn = Depends(get_connection)):
    """
    Deletes a menu item from the database.
    
    Args:
        item_name: The name of the menu item to delete
        conn: Database connection provided by dependency injection
        
    Returns:
        None: Returns no content on successful deletion
        
    Raises:
        HTTPException: 404 error if the item is not found
    """
    manager = MenuManager()
    item = manager.get_by_name(conn, item_name)
    if not item:
        raise HTTPException(status_code=404, detail=f"Menu item '{item_name}' not found")
    
    if hasattr(item, '__getitem__'):
        menu_item = MenuItem(item['name'], item['price'])
        menu_item.id = item['id']
        menu_item.delete(conn)
    else:
        item.delete(conn)
    
    return None

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)