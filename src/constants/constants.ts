export const SORT_OPTIONS = {
  release: "Release date",
  duration: "Film duration",
  rating: "Film rating",
};

export const GENRE_TYPES = [
  { key: "Drama", label: "Drama" },
  { key: "Animation", label: "Animation" },
  { key: "Adventure", label: "Adventure" },
  { key: "Family", label: "Family" },
  { key: "Comedy", label: "Comedy" },
  { key: "Fantasy", label: "Fantasy" },
  { key: "Action", label: "Action" },
  { key: "Science Fiction", label: "Science Fiction" },
  { key: "Romance", label: "Romance" },
  { key: "Mystery", label: "Mystery" },
  { key: "Thriller", label: "Thriller" },
  { key: "Music", label: "Music" },
  { key: "Horror", label: "Horror" },
  { key: "Crime", label: "Crime" },
  { key: "War", label: "War" },
  { key: "History", label: "History" },
  { key: "Western", label: "Western" },
];

export const FORM_FIELDS_DATA = {
  title: {
    label: "Title",
    formControlAttributes: {
      placeholder: "Movie title",
      name: "title",
    },
  },
  "release-date": {
    label: "Release date",
    formControlAttributes: {
      placeholder: "Select date",
      name: "release-date",
      type: "date",
    },
  },
  "image-url": {
    label: "Movie image URL",
    formControlAttributes: {
      placeholder: "Movie image URL here",
      name: "image-url",
    },
  },
  overview: {
    label: "Overview",
    formControlAttributes: {
      placeholder: "Overview here",
      name: "overview",
    },
  },
  rating: {
    label: "Rating",
    formControlAttributes: {
      placeholder: "Rating here",
      name: "rating",
      type: "number",
      step: "0.1",
      min: "0",
      max: "10",
    },
  },
  runtime: {
    label: "Runtime",
    formControlAttributes: {
      placeholder: "Runtime here",
      name: "runtime",
      type: "number",
      min: "0",
      max: "300",
    },
  },
};
