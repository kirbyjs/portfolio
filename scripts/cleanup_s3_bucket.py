
import boto3

s3 = boto3.resource('s3')
my_bucket = s3.Bucket('kirbyjs.com')

latestLastModifiedDate = s3.Object('index.html').last_modified

print(latestLastModifiedDate)

for my_bucket_object in my_bucket.objects.all():
    print(my_bucket_object)
