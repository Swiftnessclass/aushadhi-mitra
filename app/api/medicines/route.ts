import { NextResponse } from "next/server";
import medicines from'@/app/data/medicine.json';

export const  GET=()=> {
  return NextResponse.json(medicines);
}
