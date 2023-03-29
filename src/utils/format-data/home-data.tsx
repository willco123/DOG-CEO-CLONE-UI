import React from "react";
import { setAsDropDownJSX, setAsRadioJSX, wrapWithTdJSX } from "./format-data";
import type { TableData, Breeds, TableDataJSX } from "../../types";
import type { HandleRadioChange } from "./format-data";

type HandleDropDownChangeHomePage = (
  event: React.ChangeEvent<HTMLSelectElement>,
) => void;

type IsDropDownActive = (breedBeingRendered: string) => boolean;

export function dogCeoDataToTableData(breedsList: Breeds) {
  const tableData = Object.entries(breedsList).map((element) => {
    const breed = element[0];
    const subBreed = element[1];
    const tableDataObject = {
      breed: breed,
      subBreed: subBreed,
    };
    return tableDataObject;
  });
  return tableData;
}

export function tableDataToTdJSXHomePage(
  tableData: Omit<TableData, "rating" | "votes">[],
  handleRadioChange: HandleRadioChange,
  handleDropDownChange: HandleDropDownChangeHomePage,
  isDropDownActive: IsDropDownActive,
): Omit<TableDataJSX, "rating" | "votes">[] {
  const tableDataJSX = tableData.map((breedObject, index) => {
    const { breed, subBreed } = breedObject;
    const breedJSX = setAsRadioJSX(breed, "breed", handleRadioChange, index);
    const breedTdJSX = wrapWithTdJSX(breedJSX, breed, breed);
    //seems to  not work when id's clash for input id and td id

    let subBreedElement: JSX.Element | string | null;
    if (subBreed.length > 1) {
      subBreedElement = setAsDropDownJSX(
        subBreed,
        handleDropDownChange,
        isDropDownActive(breed),
      );
    } else {
      subBreedElement = subBreed[0];
    }

    const subBreedTdJSX =
      subBreedElement == null
        ? wrapWithTdJSX(null, "null", "null")
        : wrapWithTdJSX(
            subBreedElement,
            breed + " subBreed",
            breed + " subBreed",
          );

    const outputObject = {
      breed: breedTdJSX,
      subBreed: subBreedTdJSX,
    };

    return outputObject;
  });
  return tableDataJSX;
}

type GenericTableData = {
  [key: string]: string | number | null | (string | number | null)[];
};
export type GenericTableDataJSX = { [key: string]: JSX.Element };

export function tableDataToTdJSX(tableData: GenericTableData[]) {
  const tableDataTdJSXArray: GenericTableDataJSX[] = tableData.map((row) => {
    const tableDataValues = [...Object.values(row)];
    const tableDataKeys = [...Object.keys(row)];
    const tableDataTdJSX: GenericTableDataJSX = {};
    const uniqueParent = tableDataValues[0] as string;

    tableDataValues.forEach((element, index) => {
      let tableDataValueJSX;
      if (Array.isArray(element)) element = element[0];
      if (index === 0)
        tableDataValueJSX = wrapWithTdJSX(element, element, element);
      else
        tableDataValueJSX = wrapWithTdJSX(
          element,
          element,
          element + uniqueParent,
        );
      tableDataTdJSX[tableDataKeys[index]] = tableDataValueJSX;
    });

    return tableDataTdJSX;
  });
  return tableDataTdJSXArray;
}
