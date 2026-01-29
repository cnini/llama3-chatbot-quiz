from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter()

templates = Jinja2Templates(directory="templates")

@router.get("/", response_class=HTMLResponse)
def home(request: Request) :
    subjects = [
        {"id": "html", "name": "HTML"}, 
        {"id": "css", "name": "CSS"}, 
        {"id": "javascript", "name": "JavaScript"}, 
        {"id": "python", "name": "Python"},
        {"id": "sql", "name": "SQL"},
    ]

    return templates.TemplateResponse(
        "pages/home.html",
        {
            "request": request, 
            "title": "Accueil",
            "subjects": subjects
        }
    )