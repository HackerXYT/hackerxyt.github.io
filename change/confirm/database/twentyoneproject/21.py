import os
from os.path import exists
import time
from time import sleep
from turtle import clear
import webbrowser
import wget
from os import startfile
import pathlib
import json
import requests
import sys
from termcolor import colored
file_exists = os.path.exists('config.json')
def clear_console():
    os.system('cls')
print("Version 2.0.2")
print("Loading Files..")
#sleep(1.7)
clear_console()
print(colored(" ___  __   __   __", 'red'))
print(colored("|__ \/_ |  \ \ / /", 'red'))
print(colored("   ) || |   \ V /", 'red'))
print(colored("  / / | |    > <", 'red'))
print(colored(" / /_ | |   / . \ ", 'red'))
print(colored("|____||_|  /_/ \_\ ", 'red'))
if file_exists:
    file = open('config.json')
    data = json.load(file)
    print("Welcome, " + data['username'])
else:
    print(colored("Welcome to twentyoneProject!", 'green'))
    sleep(1)
    username = input(colored("Register New User:\n>>", 'cyan'))
    with open('config.json', 'w') as f:
        f.write('{ \n "username": "' + username + '"\n}')
        print("User: " + username + " registered successfully")
        sleep(0.5)
        clear_console()
        print("Welcome, " + username + "!")

print(colored("Select What You Would Like To Do:", 'white'))
print(colored("1. Check New HackerX Intros", 'green'))
print(colored("2. Launch HackerX Site", 'red'))
print(colored("3. Launch TwentyOneCore", 'cyan'))
print(colored("4. Launch HackerX Bot Console", 'magenta'))
print(colored("5. Log Out", 'red'))
choice = input(">>")
if choice == "1":
    print("1. Intro 1")
    print("2. Intro 2")
    print("3. Intro 3")
    inpt = input(">>")
    if inpt == "1":
        webbrowser.open('https://www.twentyonecore.com/database/twentyoneproject/Start.mp4')
    if inpt == "2":
        webbrowser.open('https://www.twentyonecore.com/database/twentyoneproject/Main.mp4')
    if inpt == "3":
        webbrowser.open('https://www.twentyonecore.com/database/twentyoneproject/3.mp4')
if choice == "3":
    webbrowser.open('https://www.twentyonecore.com')
if choice == "2":
    webbrowser.open('https://hackerx.xyz')
if choice == "4":
    webbrowser.open('https://201.hackerx.xyz')
if choice == "5":
    os.remove("config.json")

else:
    os.execl(sys.executable, os.path.abspath(__file__), *sys.argv) 