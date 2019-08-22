/*action*/

export const POST = "action/POST";
export const GET = "action/GET";
export const DELETE = "action/DELETE";

export function post() {
    return {type: POST}
}

export function get() {
    return {type: GET}
}

export function deleted() {
    return {type: DELETE}
}