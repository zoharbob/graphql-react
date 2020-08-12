const { queryTypes, mutationTypes } = require('./types');
const UserResolvers = require('./types/User/resolvers');
const TaskResolvers = require('./types/Task/resolvers');
const UserTaskResolvers = require('./types/UserTask/resolvers');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
} = require('graphql');

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getUsers: {
            type: new GraphQLList(queryTypes.UserType),
            resolve: UserResolvers.getUsers
        },
        getTasks: {
            type: new GraphQLList(queryTypes.TaskType),
            resolve: TaskResolvers.getTasks
        },
        getTasksByUserId: {
            type: new GraphQLList(queryTypes.UserTask),
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: TaskResolvers.getTasksByUserId
        }
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: queryTypes.UserType,
            args: {
                userInput: { type: mutationTypes.UserInputType }
            },
            resolve: UserResolvers.addUser
        },
        deleteUser: {
            type: GraphQLID,
            args: {
                id: { type: GraphQLID }
            },
            resolve: UserResolvers.deleteUser
        },
        deleteTasksByUserId: {
            type: GraphQLInt,
            args: {
                id: { type: GraphQLID }
            },
            resolve: UserTaskResolvers.deleteTasksByUserId
        },
        deleteTaskByUserIdAndTaskId: {
            type: GraphQLInt,
            args: {
                userId: { type: GraphQLID },
                taskId: { type: GraphQLID }
            },
            resolve: UserTaskResolvers.deleteTaskByUserIdAndTaskId
        },
        updateUser: {
            type: queryTypes.UserType,
            args: {
                id: { type: GraphQLID },
                userInput: { type: mutationTypes.UserInputType }
            },
            resolve: UserResolvers.updateUser
        },
        addTask: {
            type: queryTypes.TaskType,
            args: {
                taskInput: { type: mutationTypes.TaskInputType }
            },
            resolve: TaskResolvers.addTask
        },
        addUserTasks: {
            type: GraphQLInt,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLID)},
                tasks: { type: GraphQLList(GraphQLID)}
            },
            resolve: UserTaskResolvers.addUserTasks
        },
        deleteTask: {
            type: GraphQLID,
            args: {
                id: { type: GraphQLID }
            },
            resolve: TaskResolvers.deleteTask
        },
        updateTask: {
            type: queryTypes.TaskType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                taskInput: { type: mutationTypes.TaskInputType }
            },
            resolve: TaskResolvers.updateTask
        }
    }
})

module.exports = {
    queryType,
    mutationType
}