/* eslint-disable no-unused-vars */
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, order) => {
        return sum + order.likes
    }, 0)
    return total

}

const favoriteBlog = (blogs) => {
    const favoriteBlog = blogs.reduce((prev, curr) => {
        return (prev.likes > curr.likes) ? prev : curr
    })
    const { _id, url, __v, ...cleanedObj} = favoriteBlog
    return cleanedObj
}

const mostBlogs = (blogs) => {
    const authorArr = _.map(_.countBy(blogs, 'author'), (val, key) => ({author: key, blogs: val}))
    const authorWithMostBlogs = authorArr.reduce((prev, curr) => {
        return (prev.blogs > curr.blogs) ? prev : curr
    })

    return authorWithMostBlogs

}

const mostLikes = (blogs) => {
    const duplicatesRemoved = _(blogs)
        .groupBy('author')
        .map((objs, key) => ({
            'author': key,
            'likes': _.sumBy(objs, 'likes')
        })).value()
    
    const authorWithMostLikes = duplicatesRemoved.reduce((prev, curr) => {
        return (prev.likes > curr.likes) ? prev : curr
    })

    return authorWithMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}