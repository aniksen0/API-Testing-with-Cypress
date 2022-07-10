/// <reference types="Cypress" />

describe("reqres dot in get request", ()=>
{
  // const url = "https://reqres.in/api/users?page=2"
  const main_url = "https://reqres.in/";
  const url = "api/users?page=2";
  const url1 = "https://reqres.in/api/users?page=1";

  it("TC_003 If user successfully request from the api it will give 200 as a response code", ()=>
    {

        cy.request({
            url: main_url+url
          }).then((resp) => {
            expect(resp.status).to.eq(200)
          })
  })
  it("TC_001	Verify that, If user request for a list of users they get a response with all the key provided",()=>
  {
    cy.request({
      url: main_url+url
    }).then((resp) => {
      const data = resp.body
      var new_data = data.data
      console.log(new_data[0]["email"])
      var email = new_data[0]["email"]
      var id = new_data[0]["id"]
      var first_name = new_data[0]["first_name"]
      var last_name = new_data[0]["last_name"]
      var avatar = new_data[0]["avatar"]
      expect(id).to.equal(7)
      expect(new_data.length).to.equal(6)
      expect(email).to.contain("michael.lawson@reqres.in")
      expect(first_name).to.equal("Michael")
      expect(last_name).to.equal("Lawson")
      expect(avatar).to.equal("https://reqres.in/img/faces/7-image.jpg")

    })
  })
  it("TC_002	Verify that, User are getting same data from the same page.",()=>
  {
    cy.request({
      url: url1
    }).then((resp) => {
      const data = resp.body
      var new_data = data.data
      console.log(new_data[0]["email"])
      var email = new_data[0]["email"]
      let id = new_data[0]["id"]
      var first_name = new_data[0]["first_name"]
      var last_name = new_data[0]["last_name"]
      var avatar = new_data[0]["avatar"]

      cy.request({
        url: url1
      }).then((resp) => {
        const data = resp.body
        var new_data = data.data
        console.log(new_data[0]["email"])
        var email1 = new_data[0]["email"]
        let id1 = new_data[0]["id"]
        var first_name1 = new_data[0]["first_name"]
        var last_name1 = new_data[0]["last_name"]
        var avatar1 = new_data[0]["avatar"]
        expect(id).to.equal(id1)
        expect(first_name).to.equal(first_name1)
        expect(last_name).to.equal(last_name1)
        expect(avatar).to.equal(avatar1)
      })
      
    })
  })
  
  it("TC_04	If user request user by a id it will bring all the corresponding data for that user id",()=>
  {
    cy.request({
      url: main_url+url
    }).then((resp) => {
      const data = resp.body
      var new_data = data.data
      console.log(new_data[0]["email"])
      var email = new_data[0]["email"]
      var id = new_data[0]["id"]
      var first_name = new_data[0]["first_name"]
      var last_name = new_data[0]["last_name"]
      var avatar = new_data[0]["avatar"]
      expect(id).to.equal(7)
      expect(new_data.length).to.equal(6)
      expect(email).to.contain("michael.lawson@reqres.in")
      expect(first_name).to.equal("Michael")
      expect(last_name).to.equal("Lawson")
      expect(avatar).to.equal("https://reqres.in/img/faces/7-image.jpg")

    })
  })
  it("TC_05	If the user request an unambiguous URL it will throw the response code 404",()=>
  {
    cy.request({
      url: main_url+"/unambiguous",
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).to.eq(404)

    })
  })


});