## 📌 User (사용자)

### 1. 회원가입
- 요청 형식
    ```
    POST : http://localhost:8080/api/users
    
    requst header : {
        Content-Type:"application/json;charset=UTF-8", 
        Accept:"application/json",
    }
  
    requst body : {
        name: "raon",
        email: "theraon@naver.com"
        password: "1234"
        phoneNumber: "010-1111-1111"
    }
    ```
  
- 응답
    ```
    {
        "email":"theraon@naver.com",
        "password":"1234",
        "name":"raon",
        "phoneNumber":"010-1234-1111",
        "accumulationRate":5,
        "createdTime":"2021-06-15 17:11:42.024983"
    }
    ```
- 에러
    ```
    {
        "success":false,
        "response":null,
        "error":
            {
              "message":"존재하는 Email입니다.",
              "status":409
            }
    }
    ```
  
### 2. 로그인
- 요청 형식
    ```
    POST : http://localhost:8080/api/login

    requst header : {
        Content-Type:"application/json;charset=UTF-8", 
        Accept:"application/json",
    }
  
    requst body : {
        email: "test@test.com"
        password: "1234"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
      {
        "token":"JWT Token...",
        "user":{
          "email":"test@test.com",
          "name":"tester",
          "phoneNumber":"010-0123-1111",
          "accumulationRate":5,
          "role":"USER"
        }
      },
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"비밀번호가 틀렸습니다.",
        "status":400
        }
      }
    ```

### 3. 내 정보 조회
- 요청 형식
    ```
    GET : http://localhost:8080/api/users/me
    
    requst header : {
      Content-Type:"application/json;charset=UTF-8", 
       Accept:"application/json",
       Authorization: "JWT Token"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
       {
          "email":"test@test.com",
          "name":"tester",
          "phoneNumber":"010-0123-1111",
          "accumulationRate":5,
          "role":"USER"
      },
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"인증되지 않은 사용자입니다.",
        "status":401
        }
      }
    ```

### 4. 내 정보 수정
- 요청 형식
    ```
    PATCH : http://localhost:8080/api/users/me
    
    requst header : {
       Content-Type:"application/json;charset=UTF-8", 
       Accept:"application/json",
       Authorization: "JWT Token"
    }
    request body : {
      "name":"test",
      "accumulationRate":10
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
       {
          "email":"test@test.com",
          "name":"test",
          "phoneNumber":"010-0123-1111",
          "accumulationRate":10,
          "role":"USER"
      },
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"problem: 0~100까지만 입력 가능합니다.",
        "status":400
        }
      }
    ```

### 5. 회원 탈퇴
- 요청 형식
    ```
    DELETE : http://localhost:8080/api/users/me
    
    requst header : {
       Content-Type:"application/json;charset=UTF-8", 
       Accept:"application/json",
       Authorization: "JWT Token"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response": true,
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"인증되지 않은 사용자입니다.",
        "status":401
        }
      }
    ```
  
<br>

## 📌 Customer
### 1. 고객 등록
- 요청 형식
    ```
    POST : http://localhost:8080/api/customers
    
    requst header : {
       Content-Type:"application/json;charset=UTF-8", 
       Accept:"application/json",
       Authorization: "JWT Token"
    }
    request body: {
      phoneNumber: "010-1234-1234"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
        {
          "id":4,
          "phoneNumber":"010-3333-3333",
          "totalPoint":0,
          "purchaseCnt":0,
          "createdTime":"2021-06-15T18:29:52.497342"
        }
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"잘못된 값입니다.",
        "status":400
        }
      }
    ```
  
### 2. 고객정보 한명 조회 (id 이용)
- 요청 형식
    ```
    GET : http://localhost:8080/api/customers/1
    
    requst header : {
      Content-Type:"application/json;charset=UTF-8", 
      Accept:"application/json",
      Authorization: "JWT Token"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
        {
          "id":1,
          "phoneNumber":"010-1111-1111",
          "totalPoint":3700,
          "purchaseCnt":3,
          "createdTime":"2021-06-15T18:29:52.497342"
        }
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"해당 고객이 존재하지않습니다.",
        "status":400
        }
      }
    ```

### 3. 고객정보 한명 조회 (전화번호 이용)
- 요청 형식
    ```
    GET : http://localhost:8080/api/customers/phoneNumber/010-1111-1234
    
    requst header : {
       Content-Type:"application/json;charset=UTF-8", 
       Accept:"application/json",
       Authorization: "JWT Token"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
        {
          "id":1,
          "phoneNumber":"010-1111-1234",
          "totalPoint":0,
          "purchaseCnt":0,
          "createdTime":"2021-06-15T18:29:52.497342"
        }
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"유효하지 않은 전화번호 형식입니다.",
        "status":400
        }
      }
    ```

### 4. 모든 고객정보 조회
- 요청 형식
    ```
    GET : http://localhost:8080/api/customers/all
    
    requst header : {
        Content-Type:"application/json;charset=UTF-8", 
        Accept:"application/json",
        Authorization: "JWT Token"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
        [{
          "id":1,
          "phoneNumber":"010-1111-1111",
          "totalPoint":3700,
          "purchaseCnt":3,
          "createdTime":"2021-04-10T20:41:10"},
        {
          "id":2,
          "phoneNumber":"010-2222-2222",
          "totalPoint":600,
          "purchaseCnt":1,
          "createdTime":"2021-04-10T20:41:10"},
        {
          "id":4,
          "phoneNumber":"010-3333-3333",
          "totalPoint":0,
          "purchaseCnt":0,
          "createdTime":"2021-06-15T18:29:52.497342"
        }
      ]
      "error":null
    }
    ```
  
### 5. 고객정보 조회 (paging)
- 요청 형식
    ```
    GET : http://localhost:8080/api/customers
    
    requst header : {
        Content-Type:"application/json;charset=UTF-8", 
        Accept:"application/json",
        Authorization: "JWT Token"
    }
  
    request parameter : {
      page=0,
      size=10,
      sort=id,ASC
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
        [{
          "id":1,
          "phoneNumber":"010-1111-1111",
          "totalPoint":3700,
          "purchaseCnt":3,
          "createdTime":"2021-04-10T20:41:10"},
        {
          "id":2,
          "phoneNumber":"010-2222-2222",
          "totalPoint":600,
          "purchaseCnt":1,
          "createdTime":"2021-04-10T20:41:10"},
        
          //...
  
        {
          "id":10,
          "phoneNumber":"010-3333-3333",
          "totalPoint":0,
          "purchaseCnt":0,
          "createdTime":"2021-06-15T18:29:52.497342"
        }
      ]
      "error":null
    }
    ```


### 6. 포인트 사용
- 요청 형식
    ```
    PATCH : http://localhost:8080/api/customers/1
    
    requst header : {
        Content-Type:"application/json;charset=UTF-8", 
        Accept:"application/json",
        Authorization: "JWT Token"
    }
  
    request parameter : {
      point=3000
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
        {
          "id":1,
          "phoneNumber":"010-1111-1111",
          "totalPoint":700,
          "purchaseCnt":3,
          "createdTime":"2021-04-10T20:41:10"
        },
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"적립된 포인트금액보다 많습니다.",
        "status":400
        }
      }
    ```


<br>

## 📌 Orders
### 1. 구매내역 한개 조회
- 요청 형식
    ```
    GET : http://localhost:8080/api/customers/1/orders/1
    
    requst header : {
        Content-Type:"application/json;charset=UTF-8", 
        Accept:"application/json",
        Authorization: "JWT Token"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
        {
          "id":1,
          "price":12000,
          "accumulationRate":5,
          "savePoint":600,
          "paymentType":"CASH",
          "createdTime":"2021-04-10T20:41:10"
        },
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"요청하신 구매내역은 존재하지 않습니다.",
        "status":400
        }
      }
    ```

### 2. 한고객의 모든 구매내역 조회
- 요청 형식
    ```
    GET : http://localhost:8080/api/customers/1/orders/all
    
    requst header : {
        Content-Type:"application/json;charset=UTF-8", 
        Accept:"application/json",
        Authorization: "JWT Token"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
      [
        {
          "id":1,
          "price":12000,
          "accumulationRate":5,
          "savePoint":600,
          "paymentType":"CASH",
          "createdTime":"2021-04-10T20:41:10"
        },
        {
          "id":2,
          "price":20000,
          "accumulationRate":5,
          "savePoint":1000,
          "paymentType":"CASH",
          "createdTime":"2021-04-12T20:41:10"
        }
      ],
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"해당 고객이 존재하지않습니다.",
        "status":400
        }
      }
    ```

  ### 3. 날짜로 모든 구매내역 조회
- 요청 형식
    ```
    GET : http://localhost:8080/api/customers/1/orders/all
    
    requst header : {
        Content-Type:"application/json;charset=UTF-8", 
        Accept:"application/json",
        Authorization: "JWT Token"
    }
    request parmeter : {
      preDate= "2021-04-12 00:00:00",
      postDate= "2021-04-13 23:59:59"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
      [
        {
          "id":2,
          "price":20000,
          "accumulationRate":5,
          "savePoint":1000,
          "paymentType":"CASH",
          "createdTime":"2021-04-12T20:41:10",
          "customerId":1,
          "phoneNumber":"010-1111-1111",
          "purchaseCnt":3
        },
        {
          "id":3,
          "price":21000,
          "accumulationRate":10,
          "savePoint":2100,
          "paymentType":"CARD",
          "createdTime":"2021-04-13T20:41:10",
          "customerId":1,
          "phoneNumber":"010-1111-1111",
          "purchaseCnt":3
        }
      ],
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"잘못된 형식입니다.",
        "status":400
        }
      }
    ```

### 4. 구매내역 등록
- 요청 형식
    ```
    POST : http://localhost:8080/api/customers/1/orders
    
    requst header : {
        Content-Type:"application/json;charset=UTF-8", 
        Accept:"application/json",
        Authorization: "JWT Token"
    }
  
    request body : {
      "price":30000,
      "accumulationRate":5,
      "paymentType":"CARD"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
        {
          "id":6,
          "price":30000,
          "accumulationRate":5,
          "savePoint":1500,
          "paymentType":"CARD",
          "createdTime":"2021-04-10T20:41:10"
        },
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"잘못된 값입니다.",
        "status":400
        }
      }
    ```

### 5. 구매내역 수정
- 요청 형식
    ```
    PATCH : http://localhost:8080/api/customers/1/orders/1
    
    requst header : {
        Content-Type:"application/json;charset=UTF-8", 
        Accept:"application/json",
        Authorization: "JWT Token"
    }
  
    request body : {
      "price":12000,
      "accumulationRate":10,
      "paymentType":"CARD"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response":
        {
          "id":1,
          "price":12000,
          "accumulationRate":10,
          "savePoint":1200,
          "paymentType":"CARD"
          "createdTime":"2021-04-10T20:41:10"
        },
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"잘못된 값입니다.",
        "status":400
        }
      }
    ```

### 6. 구매내역 삭제
- 요청 형식
    ```
    DELETE : http://localhost:8080/api/customers/1/orders/1
    
    requst header : {
        Content-Type:"application/json;charset=UTF-8", 
        Accept:"application/json",
        Authorization: "JWT Token"
    }
    ```

- 응답
    ```
    {
      "success" :true,
      "response": true,
      "error":null
    }
    ```
- 에러
    ```
     {
      "success":false,
      "response":null,
      "error":
        {
        "message":"구매내역을 찾을 수 없습니다.",
        "status":404
        }
      }
    ```
  
 