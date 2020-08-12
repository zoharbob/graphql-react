const {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLEnumType,
} = require('graphql');

const { GraphQLDate } = require('graphql-iso-date');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        email: { type: GraphQLString },
        birth_date: { type: GraphQLDate },
    }
});

const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        email: { type: GraphQLString },
        birthDate: { type: GraphQLDate },
    }
});

const TaskStatusType = new GraphQLEnumType({
    name: 'TaskStatusEnum',
    values: {
        created: {
            value: 'created',
        },
        in_progress: {
            value: 'in_progress',
        },
        done: {
            value: 'done',
        },
    },
});

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        status: { type: TaskStatusType }
    }
});

const TaskInputType = new GraphQLInputObjectType({
    name: 'TaskInput',
    fields: {
        name: { type: GraphQLString },
        status: { type: TaskStatusType }
    }
});

const UserTask = new GraphQLObjectType({
    name: 'UserTask',
    fields: {
        userId: { type: GraphQLID },
        taskId: { type: GraphQLID },
        name: { type: GraphQLString },
        status: { type: GraphQLString }
    }
});

module.exports = {
    queryTypes: {
        UserType,
        TaskType,
        UserTask
    },
    mutationTypes: {
        UserInputType,
        TaskInputType
    }
}