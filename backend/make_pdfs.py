from reportlab.pdfgen import canvas

def create_pdf(filename, text):
    c = canvas.Canvas(filename)
    c.drawString(100, 750, text)
    c.save()

create_pdf('dummy_resume.pdf', 'Python Developer with 5 years experience in React and FastAPI')
create_pdf('dummy_jd.pdf', 'Looking for a Python Developer with FastAPI and React experience')
