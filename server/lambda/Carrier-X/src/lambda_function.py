

import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
import random
import time
from datetime import datetime
dynamodb = boto3.resource('dynamodb')
tableCarrierXPolicyDetails = dynamodb.Table('CarrierXPolicyDetails')
tableCarrierXCustomerDetails = dynamodb.Table('CarrierXCustomerDetails')
tableCarrierXBeneficiaryDetails = dynamodb.Table('CarrierXBeneficiaryDetails')
tableCarrierXBeneHistory = dynamodb.Table('CarrierXBeneHistory')
def lambda_handler(event, context):
    # TODO implement
    print('event ==', event)
    policyNumber = event.get('policyNumber')
    customerId = event.get('customerId')
    print('policyNumber ==', policyNumber)
    eventType = event.get('eventType')
    print('eventType ==', eventType)
    if eventType == "GET":
        responseCustomer = tableCarrierXCustomerDetails.get_item(Key={'customerId': customerId})
        responsePolicy = tableCarrierXPolicyDetails.get_item(Key={'policyNumber': policyNumber, 'customerId': customerId})
        print('res ==', responseCustomer)        
        
        responsePolicy1 = tableCarrierXPolicyDetails.query(IndexName='customerId-index',
        KeyConditionExpression=Key('customerId').eq(customerId))
        item = responsePolicy.get('Item')
        policyNumber = item['policyNumber']
        
        responseBeneficiary = tableCarrierXBeneficiaryDetails.query(
        IndexName='policyNumber-index',
        KeyConditionExpression=Key('policyNumber').eq(policyNumber))
        combined_result = {
            "owner":responseCustomer.get('Item'),
            "policy":responsePolicy1['Items'],
            "Beneficiary":responseBeneficiary['Items']
        }
        if combined_result:
            return {
                'statusCode': 200,
                'body': combined_result
            }
        else:
            return {
                'statusCode': 404,
                'body': 'Beneficiary not found'
            }
    elif eventType == "UPDATE":
        policyNumber = event.get('policyNumber')
      
        beneficiaryId = event.get("beneficiaryId")
        beneName = event.get("beneName")
        relationship = event.get("relationship")
        role = event.get("beneRole")
        type = event.get("beneType")
        value = event.get("beneValue")
        perstirpes = event.get("perstirpes")
        phoneNumber = event.get("phoneNumber")
        email = event.get("email")
        randomString = str(random.randint(3, 1000))
        if beneficiaryId == None:
            print("Add")
            try:
                tableCarrierXBeneficiaryDetails.put_item(
                    Item={ 
                            'beneficiaryId':"".join(["Bene", randomString]), 
                            'beneName' : beneName,
                            'perstirpes' : perstirpes,
                            'policyNumber' : policyNumber,
                            'relationship' : relationship,
                            'beneRole' : role,
                            'beneType' : type,
                            'beneValue' : value,
                            'phoneNumber' : phoneNumber,
                            'email' : email
                        } 
                )
                print("Added bene")
                tableCarrierXBeneHistory.put_item( 
                    Item={ 
                            'TransactionID':"".join(["Tran", randomString]), 
                            'dateTime': datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
                            'beneficiaryId' : "".join(["Bene", randomString]),
                            'changeTransaction' : 'Add',
                            'beneName' : beneName,
                            'perstirpes' : perstirpes,
                            'policyNumber' : policyNumber,
                            'relationship' : relationship,
                            'beneRole' : role,
                            'beneType' : type,
                            'beneValue' : value,
                            'phoneNumber' : phoneNumber,
                            'email' : email
                        } 
                )
                print("Added transaction")
            except ClientError as e:
                        print("Error updating item:")
                        print(e.response['Error']['Message'])       
        else:
            print("Update")
            try:
                responseUpdate = tableCarrierXBeneficiaryDetails.update_item(
                Key={'beneficiaryId': beneficiaryId, 'policyNumber' : policyNumber},
                UpdateExpression='SET relationship =:val2, beneRole=:val3, beneType=:val4, beneValue=:val5, perstirpes=:val6, beneName=:val7, phoneNumber=:val8, email=:val9' ,            
                ExpressionAttributeValues={
                    ':val2': relationship,
                    ':val3': role,
                    ':val4': type,
                    ':val5': value,
                    ':val6': perstirpes,
                    ':val7': beneName,
                    ':val8': phoneNumber,
                    ':val9': email
                },
                ReturnValues='UPDATED_NEW'
                )
                
                print("UpdateItem succeeded:")
                print(responseUpdate)
            except ClientError as e:
                print("Error updating item:")
                print(e.response['Error']['Message'])
            
            try:
                tableCarrierXBeneHistory.put_item( 
                    Item={ 
                            'TransactionID':"".join(["Tran", randomString]), 
                            'dateTime': datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
                            'beneficiaryId' : beneficiaryId,
                            'changeTransaction' : 'Update',
                            'beneName' : beneName,
                            'perstirpes' : perstirpes,
                            'policyNumber' : policyNumber,
                            'relationship' : relationship,
                            'beneRole' : role,
                            'beneType' : type,
                            'beneValue' : value,
                            'phoneNumber' : phoneNumber,
                            'email' : email
                        } 
                )       
                print("added update transaction")    
            except ClientError as e:
                print("Error updating item:")
                print(e.response['Error']['Message'])
        
    return {
        'statusCode': 200,
        'body': json.dumps('Successfully Inserted/Updated')
    }
import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
import random
import time
from datetime import datetime
dynamodb = boto3.resource('dynamodb')
tableCarrierXPolicyDetails = dynamodb.Table('CarrierXPolicyDetails')
tableCarrierXCustomerDetails = dynamodb.Table('CarrierXCustomerDetails')
tableCarrierXBeneficiaryDetails = dynamodb.Table('CarrierXBeneficiaryDetails')
tableCarrierXBeneHistory = dynamodb.Table('CarrierXBeneHistory')
def lambda_handler(event, context):
    # TODO implement
    print('event ==', event)
    policyNumber = event.get('policyNumber')
    customerId = event.get('customerId')
    print('policyNumber ==', policyNumber)
    eventType = event.get('eventType')
    print('eventType ==', eventType)
    if eventType == "GET":
        responseCustomer = tableCarrierXCustomerDetails.get_item(Key={'customerId': customerId})
        responsePolicy = tableCarrierXPolicyDetails.get_item(Key={'policyNumber': policyNumber, 'customerId': customerId})
        print('res ==', responseCustomer)        
        
        responsePolicy1 = tableCarrierXPolicyDetails.query(IndexName='customerId-index',
        KeyConditionExpression=Key('customerId').eq(customerId))
        item = responsePolicy.get('Item')
        policyNumber = item['policyNumber']
        
        responseBeneficiary = tableCarrierXBeneficiaryDetails.query(
        IndexName='policyNumber-index',
        KeyConditionExpression=Key('policyNumber').eq(policyNumber))
        combined_result = {
            "owner":responseCustomer.get('Item'),
            "policy":responsePolicy1['Items'],
            "Beneficiary":responseBeneficiary['Items']
        }
        if combined_result:
            return {
                'statusCode': 200,
                'body': combined_result
            }
        else:
            return {
                'statusCode': 404,
                'body': 'Beneficiary not found'
            }
    elif eventType == "UPDATE":
        policyNumber = event.get('policyNumber')
        
        beneficiaryId = event.get("beneficiaryId")
        beneName = event.get("beneName")
        relationship = event.get("relationship")
        role = event.get("beneRole")
        type = event.get("beneType")
        value = event.get("beneValue")
        perstirpes = event.get("perstirpes")
        phoneNumber = event.get("phoneNumber")
        email = event.get("email")
        randomString = str(random.randint(3, 1000))
        if beneficiaryId == None:
            print("Add")
            try:
                tableCarrierXBeneficiaryDetails.put_item(
                    Item={ 
                            'beneficiaryId':"".join(["Bene", randomString]), 
                            'beneName' : beneName,
                            'perstirpes' : perstirpes,
                            'policyNumber' : policyNumber,
                            'relationship' : relationship,
                            'beneRole' : role,
                            'beneType' : type,
                            'beneValue' : value,
                            'phoneNumber' : phoneNumber,
                            'email' : email
                        } 
                )
                print("Added bene")
                tableCarrierXBeneHistory.put_item( 
                    Item={ 
                            'TransactionID':"".join(["Tran", randomString]), 
                            'dateTime': datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
                            'beneficiaryId' : "".join(["Bene", randomString]),
                            'changeTransaction' : 'Add',
                            'beneName' : beneName,
                            'perstirpes' : perstirpes,
                            'policyNumber' : policyNumber,
                            'relationship' : relationship,
                            'beneRole' : role,
                            'beneType' : type,
                            'beneValue' : value,
                            'phoneNumber' : phoneNumber,
                            'email' : email
                        } 
                )
                print("Added transaction")
            except ClientError as e:
                        print("Error updating item:")
                        print(e.response['Error']['Message'])       
        else:
            print("Update")
            try:
                responseUpdate = tableCarrierXBeneficiaryDetails.update_item(
                Key={'beneficiaryId': beneficiaryId, 'policyNumber' : policyNumber},
                UpdateExpression='SET relationship =:val2, beneRole=:val3, beneType=:val4, beneValue=:val5, perstirpes=:val6, beneName=:val7, phoneNumber=:val8, email=:val9' ,            
                ExpressionAttributeValues={
                    ':val2': relationship,
                    ':val3': role,
                    ':val4': type,
                    ':val5': value,
                    ':val6': perstirpes,
                    ':val7': beneName,
                    ':val8': phoneNumber,
                    ':val9': email
                },
                ReturnValues='UPDATED_NEW'
                )
                
                print("UpdateItem succeeded:")
                print(responseUpdate)
            except ClientError as e:
                print("Error updating item:")
                print(e.response['Error']['Message'])
            
            try:
                tableCarrierXBeneHistory.put_item( 
                    Item={ 
                            'TransactionID':"".join(["Tran", randomString]), 
                            'dateTime': datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
                            'beneficiaryId' : beneficiaryId,
                            'changeTransaction' : 'Update',
                            'beneName' : beneName,
                            'perstirpes' : perstirpes,
                            'policyNumber' : policyNumber,
                            'relationship' : relationship,
                            'beneRole' : role,
                            'beneType' : type,
                            'beneValue' : value,
                            'phoneNumber' : phoneNumber,
                            'email' : email
                        } 
                )       
                print("added update transaction")    
            except ClientError as e:
                print("Error updating item:")
                print(e.response['Error']['Message'])
        
    return {
        'statusCode': 200,
        'body': json.dumps('Successfully Inserted/Updated')
    }
