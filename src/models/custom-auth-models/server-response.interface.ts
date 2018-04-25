

// generic rapper for any response come back from the server.
// note : most of the data returned from the responses are from the shape { data : [server answer]} .
// the reason (of wrapping the server answer inside an object) is mainly to keep the data reflexible.

export interface ServerResponse<T> {
    data: T,
    extraData: {}
}