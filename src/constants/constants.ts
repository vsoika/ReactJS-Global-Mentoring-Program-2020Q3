import * as yup from "yup";

export const MOVIES_DATA_URL = "http://localhost:4000/movies";

export const SORT_OPTIONS = {
  release: "Release date",
  duration: "Film duration",
  rating: "Film rating",
};

export const GENRE_OPTIONS = {
  all: "All",
  documentary: "Documentary",
  comedy: "Comedy",
  horror: "Horror",
  crime: "Crime",
};

export const GENRE_TYPES = [
  { value: "Drama", label: "Drama" },
  { value: "Animation", label: "Animation" },
  { value: "Adventure", label: "Adventure" },
  { value: "Family", label: "Family" },
  { value: "Comedy", label: "Comedy" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Action", label: "Action" },
  { value: "Science Fiction", label: "Science Fiction" },
  { value: "Romance", label: "Romance" },
  { value: "Mystery", label: "Mystery" },
  { value: "Thriller", label: "Thriller" },
  { value: "Music", label: "Music" },
  { value: "Horror", label: "Horror" },
  { value: "Crime", label: "Crime" },
  { value: "War", label: "War" },
  { value: "History", label: "History" },
  { value: "Western", label: "Western" },
  { value: "Documentary", label: "Documentary" },
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
      name: "release_date",
      type: "date",
    },
  },
  "image-url": {
    label: "Movie image URL",
    formControlAttributes: {
      placeholder: "Movie image URL here",
      name: "poster_path",
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
      name: "vote_average",
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

export const SCHEMA = yup.object({
  title: yup.string().required(),
  vote_average: yup
    .number()
    .min(0, "Rating must be greater than 0")
    .max(10, "Rating can't be greater than 10")
    .min(0, "Rating must be greater than 0")
    .required("rating is required field"),
  release_date: yup.date().required("release date is required field"),
  poster_path: yup
    .string()
    .url("*Must enter URL in http://www.example.com format")
    .required("url is required field"),
  overview: yup.string().required(),
  genres: yup.array().min(1, "Pick at least 1 option"),
  runtime: yup.number().min(0, "Rating must be greater than 0").required(),
});

export interface IFormikValues {
  id?: number,
  title: string,
  vote_average: number,
  release_date: string,
  poster_path: string,
  overview: string,
  runtime: number,
  genres: string[] | undefined[],
  tagline?: string,
  vote_count?: number,
  budget?: number,
  revenue?: number,
}