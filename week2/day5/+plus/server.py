from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from functools import lru_cache
from my_py_postegres.main import DatabaseManager
from my_py_postegres.config import DatabaseConfig

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

@lru_cache()
def get_db_config():
    """Create and cache database configuration."""
    config = DatabaseConfig()
    config.host = DB_CONFIG["host"]
    config.user = DB_CONFIG["user"]
    config.password = DB_CONFIG["password"]
    config.default_db = DB_CONFIG["dbname"]
    return config

def get_db_manager():
    """FastAPI dependency that provides a database manager to route handlers."""
    db_manager = DatabaseManager(get_db_config())
    db_manager.selected_db = DB_CONFIG["dbname"]
    success = db_manager.setup()
    if not success:
        raise HTTPException(status_code=500, detail="Failed to connect to database")
    try:
        yield db_manager
    finally:
        db_manager.close()

def format_menu_item(item):
    """
    Format a menu item dictionary for API response.
    
    Args:
        item: Dictionary with menu item data from the database
        
    Returns:
        dict: Standardized dictionary with id, name, and price fields
    """
    id_value = None
    for id_field in ['id', 'menu_id', 'menuitem_id', 'item_id']:
        if id_field in item:
            id_value = item[id_field]
            break
    
    if id_value is None:
        print(f"Warning: Could not find ID field in item: {item}")
        id_value = 0
    
    name_value = None
    for name_field in ['name', 'item_name', 'menuitem_name']:
        if name_field in item:
            name_value = item[name_field]
            break
    
    if name_value is None:
        name_value = "Unknown"
    
    price_value = None
    for price_field in ['price', 'item_price', 'menuitem_price']:
        if price_field in item:
            price_value = item[price_field]
            break
    
    if price_value is None:
        price_value = 0.0
    
    return {
        "id": id_value,
        "name": name_value,
        "price": float(price_value) if price_value is not None else 0.0
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
def get_all_menu_items(db_manager = Depends(get_db_manager)):
    """
    Retrieves all menu items from the database.
    
    Args:
        db_manager: Database manager provided by dependency injection
        
    Returns:
        list: A list of menu items formatted according to MenuItemResponse schema
    """
    success, result = db_manager.fetchall("Menu_Items")
    
    if not success:
        raise HTTPException(status_code=500, detail="Failed to retrieve menu items")
    
    if result and len(result) > 0:
        print(f"First menu item fields: {result[0].keys()}")
    
    return [format_menu_item(item) for item in result]

@app.get("/menu/{item_name}", response_model=MenuItemResponse)
def get_menu_item_by_name(item_name: str, db_manager = Depends(get_db_manager)):
    """
    Retrieves a specific menu item by its name.
    
    Args:
        item_name: The name of the menu item to retrieve
        db_manager: Database manager provided by dependency injection
        
    Returns:
        dict: The menu item data formatted according to MenuItemResponse schema
        
    Raises:
        HTTPException: 404 error if the item is not found
    """
    items = db_manager.select("Menu_Items", conditions={"item_name": item_name})
    
    if not items:
        raise HTTPException(status_code=404, detail=f"Menu item '{item_name}' not found")
    
    return format_menu_item(items[0])

@app.post("/menu", response_model=MenuItemResponse, status_code=201)
def create_menu_item(item_data: MenuItemCreate, db_manager = Depends(get_db_manager)):
    """
    Creates a new menu item in the database.
    
    Args:
        item_data: The menu item data validated against MenuItemCreate schema
        db_manager: Database manager provided by dependency injection
        
    Returns:
        dict: The created menu item with its assigned ID
        
    Raises:
        HTTPException: 400 error if creation fails
        HTTPException: 500 error if the item was saved but cannot be retrieved
    """
    try:
        db_manager.begin_transaction()
        
        items = db_manager.select("Menu_Items", conditions={"item_name": item_data.name})
        if items:
            db_manager.rollback()
            raise HTTPException(status_code=400, detail=f"Menu item '{item_data.name}' already exists")
        
        success, message = db_manager.insert("Menu_Items", {
            "item_name": item_data.name,
            "item_price": item_data.price
        })
        
        if not success:
            db_manager.rollback()
            raise HTTPException(status_code=400, detail=message)
        
        db_manager.commit()
        
        items = db_manager.select("Menu_Items", conditions={"item_name": item_data.name})
        if not items:
            raise HTTPException(status_code=500, detail="Item was saved but cannot be retrieved")
        
        return format_menu_item(items[0])
    except HTTPException:
        raise
    except Exception as e:
        db_manager.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/menu/{item_name}", response_model=MenuItemResponse)
def update_menu_item(item_name: str, item_data: MenuItemUpdate, db_manager = Depends(get_db_manager)):
    """
    Updates an existing menu item.
    
    Args:
        item_name: The name of the menu item to update
        item_data: The update data validated against MenuItemUpdate schema
        db_manager: Database manager provided by dependency injection
        
    Returns:
        dict: The updated menu item data
        
    Raises:
        HTTPException: 404 error if the item is not found
        HTTPException: 400 error if attempting to change the item name
        HTTPException: 500 error if the item was updated but cannot be retrieved
    """
    db_manager.begin_transaction()
    
    try:
        items = db_manager.select("Menu_Items", conditions={"item_name": item_name})
        if not items:
            db_manager.rollback()
            raise HTTPException(status_code=404, detail=f"Menu item '{item_name}' not found")
        
        if item_data.name is not None and item_data.name != item_name:
            db_manager.rollback()
            raise HTTPException(status_code=400, detail="Changing item name is not supported")
        
        update_data = {}
        if item_data.price is not None:
            update_data["item_price"] = item_data.price
        
        if not update_data:
            db_manager.rollback()
            return format_menu_item(items[0])
        
        success, message = db_manager.update("Menu_Items", update_data, {"item_name": item_name})
        if not success:
            db_manager.rollback()
            raise HTTPException(status_code=400, detail=message)
        
        db_manager.commit()
        
        updated_items = db_manager.select("Menu_Items", conditions={"item_name": item_name})
        if not updated_items:
            raise HTTPException(status_code=500, detail="Item was updated but cannot be retrieved")
        
        return format_menu_item(updated_items[0])
    except HTTPException:
        raise
    except Exception as e:
        db_manager.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/menu/{item_name}", status_code=204)
def delete_menu_item(item_name: str, db_manager = Depends(get_db_manager)):
    """
    Deletes a menu item from the database.
    
    Args:
        item_name: The name of the menu item to delete
        db_manager: Database manager provided by dependency injection
        
    Returns:
        None: Returns no content on successful deletion
        
    Raises:
        HTTPException: 404 error if the item is not found
    """
    db_manager.begin_transaction()
    
    try:
        items = db_manager.select("Menu_Items", conditions={"item_name": item_name})
        if not items:
            db_manager.rollback()
            raise HTTPException(status_code=404, detail=f"Menu item '{item_name}' not found")
        
        success, message = db_manager.delete("Menu_Items", {"item_name": item_name})
        if not success:
            db_manager.rollback()
            raise HTTPException(status_code=400, detail=message)
        
        db_manager.commit()
        
        return None
    except HTTPException:
        raise
    except Exception as e:
        db_manager.rollback()
        raise HTTPException(status_code=400, detail=str(e))
