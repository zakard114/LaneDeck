import pytest
from fastapi.testclient import TestClient

from lanedeck_backend.main import create_app
from lanedeck_backend.routes import store


@pytest.fixture()
def client():
    store.clear()
    app = create_app()
    with TestClient(app) as test_client:
        yield test_client
    store.clear()
