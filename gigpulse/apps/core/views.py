from django.contrib.staticfiles import finders
from django.http import HttpResponse, HttpResponseNotFound


def spa_index(request):
	"""Return the built frontend index.html from static/dist for SPA routes."""
	index_path = finders.find("dist/index.html")
	if not index_path:
		return HttpResponseNotFound("SPA index not found")

	with open(index_path, "rb") as fh:
		return HttpResponse(fh.read(), content_type="text/html")
