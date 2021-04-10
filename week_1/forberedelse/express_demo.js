const Joi = require('joi');
const express = require('express');
const app = express()

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
]

//test
app.get('/', (req, res) => {
    res.send('Hello World');
});

//get all courses
app.get('api/courses', (req, res) => {
    res.send(courses);
});

//get course by id
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found')
    res.send(course)
});

//create new course
app.post('/api/courses', (req, res) => {

    //validate function call
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

//update course
app.put('/api/courses/:id', (req, res) => {
    //find course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found')

    //validate function call
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //update
    course.name = req.body.name;

    //return updated course
    res.send(course);
});

//delete course
app.delete('/api/courses/:id', (req, res) => {
    //find course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found')

    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return response
    res.send(course)

})

//validate function
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));