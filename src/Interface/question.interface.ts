import React from "react";

export interface IQuestion {
  question?: string | any;
  category: string;
  incorrect_answers?: React.ReactNode;
  correct_answer?: React.ReactNode;
}
