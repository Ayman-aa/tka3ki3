import random

def get_random_temp(season=None):

    if season is None:
        return round(random.uniform(-10, 40), 1)
    
    if season.lower() == 'winter':
        return round(random.uniform(-10, 16), 1)
    elif season.lower() == 'spring':
        return round(random.uniform(5, 23), 1)
    elif season.lower() == 'summer':
        return round(random.uniform(15, 40), 1)
    elif season.lower() == 'autumn' or season.lower() == 'fall':
        return round(random.uniform(0, 25), 1)
    else:
        return round(random.uniform(-10, 40), 1)

def get_season_from_month(month):

    if month in [12, 1, 2]:
        return 'winter'
    elif month in [3, 4, 5]:
        return 'spring'
    elif month in [6, 7, 8]:
        return 'summer'
    elif month in [9, 10, 11]:
        return 'autumn'
    else:
        return None

def get_temperature_advice(temp):
    if temp < 0:
        return "Brrr, that's freezing! Wear some extra layers today."
    elif 0 <= temp < 16:
        return "Quite chilly! Don't forget your coat."
    elif 16 <= temp < 23:
        return "It's a pleasant temperature. A light jacket should be fine."
    elif 23 <= temp < 32:
        return "It's quite warm. T-shirt weather!"
    else:  # 32 <= temp <= 40
        return "It's hot! Stay hydrated and find some shade."

def main():
    choice = input("Would you like to enter the month number or the season? (month/season): ").lower()
    season = None

    if choice == 'month':
        try:
            month = int(input("Enter the month number (1-12): "))
            if 1 <= month <= 12:
                season = get_season_from_month(month)
                print(f"Based on the month, the season is {season}.")
            else:
                print("Invalid month number. Using random temperature.")
        except ValueError:
            print("Invalid input. Using random temperature.")
    else:
        season = input("Enter the season (winter, spring, summer, autumn/fall): ").lower()
        if season not in ['winter', 'spring', 'summer', 'autumn', 'fall']:
            print("Season not recognized. Using random temperature.")
            season = None
    
    temperature = get_random_temp(season)
    
    print(f"The temperature right now is {temperature} degrees Celsius.")
    print(get_temperature_advice(temperature))

main()