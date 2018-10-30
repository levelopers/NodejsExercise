const express = require('express');
const Joi = require('joi');
const app = express()

app.use(express.json())

const courses = [
  {id:1,name:"course 1"},
  {id:2,name:"course 2"},
  {id:3,name:"course 3"},

]

//get(url,callback(req,res)=>{})
app.get('/',(req,res)=>{

  res.send(`
    <html>
    <body>
    <h1>this is heading 1</h1>
    </body>
    </html>
    `)
})




//handle get METHOD with req.params and server variable
app.get('/course/:id',(req,res)=>{
  let course = courses.find((e)=>{
    if (e.id==parseInt(req.params.id)) {
      return e;
    }
    return null;

  })
  if (course==null) {
    res.status(404).send('can not find this course')
  }
  res.send(course.name)
})//end get

//handle post METHOD
//using postman chrome app to send object to server
//using joi schema validate input object
app.post('/course',(req,res)=>{
//schema validate
const schema = {
  //name value need length min 3
  name:Joi.string().min(3).required()
}

const schema_validate = Joi.validate(req.body,schema)
console.log(schema_validate);

if (schema_validate.error) {
  res.status(400).send(schema_validate.error.details[0].message)
  return
}

  let courseNew = {
    id:courses.length+1,
    //req.body {name:"a new name here"}
    name:req.body.name
  }
  courses.push(courseNew)
  res.send(courseNew)

})//end post



//handle put METHOD
//updating objects
app.put('/course/:id',(req,res)=>{
  //request error
  //1. 404 can not find id in courses object
  //@return boolean
  const find_course = courses.find(e=>{
    return e.id==req.params.id
  })
  if (!find_course) {
    res.status(404).send("can not find this id ")
  }

  //request error
  //2. unvalid request object

  //@params validate object, schema
  //@return Joi object
  const {error} = validate(req.body)//object destructuring
  if (error) {
    res.status(400).send(error.details[0].message)
  }

  //update server object::courses
  find_course.name = req.body.name
  res.send(find_course)
  // console.log(courses);

})//end put

//seperate validate function using Joi
function validate(targetObj) {
  const schema = {
    name : Joi.string().min(3).required()
  }

  return Joi.validate(targetObj,schema)
}











app.listen(3000,()=>{
  console.log("this prints on console");
  console.log("serverlistningon 3000");
})
