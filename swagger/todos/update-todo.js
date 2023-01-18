module.exports = {
  patch:{
    tags:['Todo CRUD operations'],
    description: "Update todo",
    operationId: "updateTodo",
    requestBody: {
      content:{
        'application/json': {
          schema:{
            $ref:'#/components/schemas/TodoUpdate'
          }
        }
      }
    },
    responses:{

      '200':{
        description: "Todo updated successfully"
      },
      '404':{
        description: "Todo not found"
      },
      '500':{
        description: "Server error"
      }

    }
  }
}
