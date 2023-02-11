const db = require('../utils/mongo');
const courseSchema = require('../models/courses');
db();
const Course = {
    async getCourses() {
        try {
            const courses = await courseSchema.find();
            if (!courses) {
                throw new Error('Courses not found')
            }
            return courses;
        } catch (err) {
            console.log(err);
            return err;
        }

    },
    async get(id) {
        try {
            const course = await courseSchema.findById({ _id: id });
            if (!course) {
                throw new Error('course not found');
            }
            return course;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    async delete(id) {
        try {
            await courseSchema.deleteOne({ _id: id });
            return 'ok'
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    async create(payload) {
        try {
            const { title, description, usersIds, price, image, quotes } = data;
            if (!title && description && price && image && quotes && usersIds) {
                throw new Error('data is required');
            }
            const objet = {
                ...data,
                price: parseInt(price),
                quotes: parseInt(quotes),
                image: 'hhtsasas',
            }
            const course = await courseSchema.create(objet);
            return course;

        } catch (err) {
            console.log(err)
            return err;
        }
    },
    async update(id,payload) {
        try {
            const course = await courseSchema.updateOne({ _id: id }, data);
            return course;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = Course;