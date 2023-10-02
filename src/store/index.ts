// An index file indicates that contents of a directory are not meant to be
// imported directly from the outside by convention.
//
// They are typically created
// when a file grows so large that it makes sense to cut it up, yet its internals
// are not meant to be used from the outside.
//
// When a directory does not have an index.js in it, all files are up for grabs in it.
export * from './store';
