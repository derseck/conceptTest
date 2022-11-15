superuser:
	docker exec -it project_name ./manage.py createsuperuser

makemigrations:
	docker exec -it project_name ./manage.py makemigrations

migrate:
	docker exec -it project_name ./manage.py migrate

initialfixture:
	docker exec -it project_name ./manage.py loaddata initial

testfixture:
	docker exec -it project_name ./manage.py loaddata test

test:
	docker exec -it project_name ./manage.py test

testapp:
	docker exec -it project_name ./manage.py test $(app) --noinput -v 3
