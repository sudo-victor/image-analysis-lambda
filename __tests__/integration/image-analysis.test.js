const { describe, test, expect } = require('@jest/globals')
const requestMock = require("../mocks/request.json")
const aws = require("aws-sdk")
aws.config.update({
  region: 'us-east-1'
})
const { main } = require("../../src")

describe("Image Analyser Test Suit", () => {
  test("it should analyse successfuly the image returning the results", async () => {
    const expected = {
      statusCode: 200,
      body: "A imagem tem\n100.00% de ser do tipo Animal\n100.00% de ser do tipo canino\n100.00% de ser do tipo cão\n100.00% de ser do tipo mamífero\n100.00% de ser do tipo animal de estimação\n100.00% de ser do tipo cachorrinho\n95.72% de ser do tipo gato"
    }
    const result = await main(requestMock)
    expect(result).toStrictEqual(expected)
  })

  test("given an empty querystring it should return status code 400", async () => {
    const expected = {
      statusCode: 400,
      body: 'an IMG is required!'
    }
    const result = await main({ queryStringParameters: {} })
    expect(result).toStrictEqual(expected)
  })

  test("given an invalid imageURL it should return status code 500", async () => {
    const expected = {
      statusCode: 500,
      body: 'Internal Server Error'
    }
    const result = await main({ queryStringParameters: {
      imageUrl: 'test'
    } })
    expect(result).toStrictEqual(expected)
  })
})