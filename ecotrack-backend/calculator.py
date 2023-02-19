from app import app, db
from app.models import ElecData


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Elecal': ElecData}
