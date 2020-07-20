import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
// Apollo
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { environment } from '@env/environment';

const uri = environment.GraphQLCoreAPI;

export function provideApollo(httpLink: HttpLink): any {
    let auth = null;
    const token =
        typeof window !== 'undefined'
            ? window.localStorage.getItem('vimbo_token')
            : null;
    const basic = setContext((op, ctx) => ({
        headers: new HttpHeaders().set('Accept', 'charset=uf-8')
    }));

    if (!token) {
        auth = '';
    } else {
        auth = setContext((operation, ctx) => ({
            headers: ctx.headers.append('Authorization', `Bearer ${token}`)
        }));
    }

    const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);

    return {
        link,
        cache: new InMemoryCache()
    };
}

@NgModule({
    exports: [HttpClientModule, ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: provideApollo,
            deps: [HttpLink]
        }
    ]
})
export class GraphQLModule {}

/*
*
* It's often useful to ask a GraphQL schema for information about what
* queries it supports. GraphQL allows us to do so using the
* introspection system!
*
query IntrospectionQuery {
    __schema {
        queryType {
            name
        }
        mutationType {
            name
        }
        subscriptionType {
            name
        }
        types {
        ...FullType
        }
        directives {
            name
            description
            locations
            args {
            ...InputValue
            }
        }
    }
}

fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
        name
        description
        args {
        ...InputValue
        }
        type {
        ...TypeRef
        }
        isDeprecated
        deprecationReason
    }
    inputFields {
    ...InputValue
    }
    interfaces {
    ...TypeRef
    }
    enumValues(includeDeprecated: true) {
        name
        description
        isDeprecated
        deprecationReason
    }
    possibleTypes {
    ...TypeRef
    }
}

fragment InputValue on __InputValue {
    name
    description
    type {
    ...TypeRef
    }
    defaultValue
}

fragment TypeRef on __Type {
    kind
    name
    ofType {
        kind
        name
        ofType {
            kind
            name
            ofType {
                kind
                name
                ofType {
                    kind
                    name
                    ofType {
                        kind
                        name
                        ofType {
                            kind
                            name
                            ofType {
                                kind
                                name
                            }
                        }
                    }
                }
            }
        }
    }
}
*/
