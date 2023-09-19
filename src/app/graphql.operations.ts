
import gql from "graphql-tag"
import {query} from "@angular/animations";

const GET_POSTS = gql`
query GetPosts{
posts {
id
title
description
}`

export {GET_POSTS};
