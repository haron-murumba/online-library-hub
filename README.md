# online-library-hub


Online Maktaba

Online Maktaba is a web-based library platform designed for Kenya’s Competency-Based Curriculum (CBC). It provides students with easy access to books for primary and secondary school, bridging the gap between national and local schools.

Features

Browse Subjects and Grades (Primary & Secondary)

View Featured Books with cover images

User authentication: Login & Register

Responsive design using Bootstrap

Organized layout with Navbar, Footer, and Hero Section

Easy-to-manage static files (images, CSS, JS)

Requirements

Python 3.x

Django 4.x or higher

Bootstrap 5.x

Git (for version control)

Internet connection for CDN resources

Optional for development:

VS Code (or any code editor)

Virtual environment (venv)

Pillow (for image handling in Django)

Folder Structure
online-library-hub/
│
├── manage.py
├── requirements.txt
├── README.md
├── db.sqlite3
│
├── online_maktaba/       # Django project folder
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── books.html
│   ├── subjects.html
│   ├── login.html
│   └── register.html
│
└── static/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── scripts.js
    └── images/
        ├── book1.png
        ├── book2.png
        └── library.png

Installation

Clone the repository:

git clone https://github.com/haron-murumba/online-library-hub.git
cd online-library-hub


Create and activate a virtual environment:

python -m venv env
source env/bin/activate  # Linux/macOS
env\Scripts\activate     # Windows


Install dependencies:

pip install -r requirements.txt


Run the server:

python manage.py runserver


Visit http://127.0.0.1:8000 to view the Online Maktaba.

Screenshots
Homepage

Subjects Page

Featured Books

Note: These are sample placeholder images. You can replace them with your CBC-focused book covers.

Usage

Navigate through Subjects and Grades to find books.

Register or login to access personalized features.

Use the search bar (future enhancement) to find specific books.

License

MIT License © 2025 Haron Murumba