
import boto3
import datetime

s3 = boto3.resource('s3')
my_bucket = s3.Bucket('kirbyjs.com')
latest_last_modified_date = my_bucket.Object('index.html').last_modified

for obj in my_bucket.objects.all():
    last_modified = obj.Object().last_modified

    if (last_modified < latest_last_modified_date - datetime.timedelta(0, 30)):
        obj.Object().delete()