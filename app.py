from typing import Annotated
from fastapi import FastAPI, Form, Request, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from image_processing import get_dominant_colors  # Assume this module exists for image processing

app = FastAPI(title="Color Detection App")
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory=["templates", "partials"])

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html.j2", {"request": request, "colors": []})

@app.post("/", response_class=HTMLResponse)
async def detect_colors(request: Request, file: UploadFile, numOfColors: Annotated[int, Form()]):
    colors = get_dominant_colors(file.file, numOfColors)
    return templates.TemplateResponse("color-result.html.j2", {"request": request, "colors": [f"rgb({d['r']}, {d['g']}, {d['b']})" for d in colors]})
