/// <reference types="Cypress" />


describe("reqres dot in post request", ()=>
{
    const main_url = "https://reqres.in/";
    const create_user = "api/users/21/123";
    const put_delete = "api/users/2"

    it("TC_06	If user creates a user it will show response 201",()=>
    {
        cy.request({
            url: main_url+create_user,
            method: "POST",
            body: {
                "first_name": "morpheus",
                "id":123,
                "job":"tester"

            }
          }).then((resp) => {
            expect(resp.status).to.eq(201)
            var data = resp.body;
            expect(data['id']).to.equal(123)
            expect(data['first_name']).to.equal("morpheus")
            expect(data['job']).to.equal("tester")
          })  
    })

    it("TC_07	if user use bad syntax on the request body it should throw response code 400",()=>
    {
        cy.request({
            url: main_url+create_user,
            method: "POST",
          }).then((resp) => {
              
            expect(resp.status).to.eq(201)
          })  
    })
    it("TC_08	User can update the value of a user by put request and it will return the 200 reponse with the updated response data",()=>
    {
        cy.request({
            url: main_url+put_delete,
            method: "PUT",
            body:{
                
                    "name": "anik",
                    "job": "zion resident"
                
            }
          }).then((resp) => {
            var data = resp.body;
            expect(data['name']).to.equal("anik")
            expect(data['job']).to.equal("zion resident")
            expect(resp.status).to.eq(200)
          })
    })

    it("TC_09 If user send delete request to the api it will show 204 response code as it will delete the user and won't return any content",()=>
    {
        cy.request({
            url: main_url+put_delete,
            method: "DELETE",
          }).then((resp) => {
            var data = resp.body;
            expect(resp.status).to.eq(204)
          })
    })
})