module.exports = {
  post:{
    tags:['Todo CRUD operations'],
    description: "Create todo",
    operationId: "createTodo",
    parameters:[],
    requestBody: {
      content:{
        'application/json': {
          schema:{
            $ref:'#/components/schemas/TodoCreate'
          }
        }
      }
    },
    responses:{
      '201':{
        description: "Todo created successfully"
      },
      '500':{
        description: 'Server error'
      }
    }
  }
}
