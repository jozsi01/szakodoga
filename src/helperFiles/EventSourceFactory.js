export function getEventSource(){
    return new EventSource("http://localhost:8080/subscribe");
}