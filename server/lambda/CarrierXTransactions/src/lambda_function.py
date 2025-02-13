from pymongo import MongoClient
import json

def lambda_handler(event, context):
    try:
        # Replace <username>, <password>, and <your-cluster-endpoint> with your actual values
        # uri = "mongodb://iridocdb:iri1234!@iridocdb.c3muig6sai0z.us-east-1.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&retryWrites=false"
        # uri = "mongodb://iridocdb:iri1234!@iridocdb.c3muig6sai0z.us-east-1.docdb.amazonaws.com:27017/?ssl=true&tlsCAFile=rds-combined-ca-bundle.pem&retryWrites=false"
        uri = "mongodb://iridocdb:iri1234!@iridocdb.c3muig6sai0z.us-east-1.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&retryWrites=false"

        # Connect to DocumentDB
        client = MongoClient(uri)
        db = client["iridocdb"]
        collection = db["mycollection"]

        # Query the collection
        result = collection.find_one({"name": "John Doe"})

        # Return the result as JSON
        return {
            "statusCode": 200,
            "body": json.dumps(result, default=str)  # Convert ObjectId and datetime to string
        }

    except Exception as e:
        print("Error:", str(e))
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

if __name__ == "__main__":
    event = {}  # Simulated event input
    context = {}  # Simulated Lambda context
    response = lambda_handler(event, context)
    print(json.dumps(response, indent=2))
