#### Hi there :)


# API List

## Adding Platfrom data
  ### URL : http://localhost:8080/plma/platfrom/addplatform
  ### Method : POST
  ### Payload : {
    "lot": 1,
    "capacity": [
        {
            "type": "twoWheeler",
            "capacity": 5,
            "rate": 10
        },
        {
            "type": "hatchback",
            "capacity": 5,
            "rate": 20
        },
        {
            "type": "suv",
            "capacity": 5,
            "rate": 30
        }
    ],
    "area": "First Floor"
}

## Park Vehicle
  ### URL :  http://localhost:8080/plma/vehicles/parkvehicle

  ### Method : POST
  ### Payload : { 
    "name" : "Tata Harrior",
    "type" : "suv",
    "lotNumber":1,
    "vehicleNumber":"Abc123"
}

## Exist Vehicle

  ### URL :  http://localhost:8080/plma/vehicles/exitparkingvehicle?vehicleNumber=Abc123
  ### Method : GET

## Check Vehicle History
  ### URL : http://localhost:8080/plma/vehicles/checkparkinghitory?vehicleNumber=Abc123
  ### Method : GET

