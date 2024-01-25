### How to install Python and run API tests

### Install Python

https://www.python.org/downloads/

Run the installer. Ensure to check the option "Add Python to PATH" during installation.

### Install Anaconda

https://www.anaconda.com/download

### Set up virtual environment called "dog"

Or replace with a name of your choice

- Open a terminal
- `python -m venv dog`
- `.\dog\Scripts\activate`
- Navigate to the root of the project
- `pip install -r requirements.txt`

### run tests

- Navigate to /server/tests
- `python test_app.py`