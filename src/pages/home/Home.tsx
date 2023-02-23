import React, { useEffect, useState } from "react";
import "./home.css";
import FiveStarRating from "../../components/five-star-rating/FiveStarRating";
import TableComponent from "../../components/table-component/TableComponent";
import {
  getBreeds,
  getRandomDogImage,
  getRandomDogImageByBreed,
} from "../../services/dog-ceo";
import type { Breeds, TableDataJSX, TableData } from "../../types";
import {
  dogCeoDataToTableData,
  tableDataToTdJSXHomePage,
} from "../../utils/format-data";
import RadioHideInput from "../../components/radio-hide-input/RadioHideInput";

function Home() {
  const [dogImage, setDogImage] = useState<string>("");
  const [breedsList, setBreedsList] = useState<Breeds>({});
  const [tableData, setTableData] = useState<Omit<TableData, "rating">[]>([]);
  const [tableDataJSX, setTableDataJSX] = useState<
    Omit<TableDataJSX, "rating">[]
  >([]);

  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedSubBreed, setSelectedSubBreed] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);

  function showSelection() {
    if (!selectedBreed) return " ";
    const subBreed = selectedSubBreed ? selectedSubBreed : " ";
    const selection = selectedBreed + " " + subBreed;
    return selection;
  }

  const selection = showSelection();

  useEffect(() => {
    (async () => {
      setDogImage(await getRandomDogImage());
      setBreedsList(await getBreeds());
    })();
  }, []);

  useEffect(() => {
    const tableDataFromBreedsList = dogCeoDataToTableData(breedsList);
    setTableData(tableDataFromBreedsList);
  }, [breedsList]);

  useEffect(() => {
    const tableDataTdJSX = tableDataToTdJSXHomePage(
      tableData,
      handleRadioChange,
      handleDropDownChange,
      isDropDownActive,
    );
    setTableDataJSX(tableDataTdJSX);
  }, [tableData]);

  useEffect(() => {
    //basically forcing a re-render here upon changing selected breed
    const tableDataTdJSX = tableDataToTdJSXHomePage(
      tableData,
      handleRadioChange,
      handleDropDownChange,
      isDropDownActive,
    );
    setTableDataJSX(tableDataTdJSX);
  }, [selectedBreed]);

  function isDropDownActive(breedBeingRendered: string) {
    if (selectedBreed === breedBeingRendered) return true;
    return false;
  }

  function handleRadioChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const firstSubBreed = tableData[index].subBreed[0];
    const newSelectedBreed = event.target.value;
    setSelectedBreed(newSelectedBreed);
    setSelectedSubBreed(firstSubBreed);
  }

  function handleDropDownChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newSelectedSubBreed = event.target.value;

    setSelectedSubBreed(newSelectedSubBreed);
  }

  function handleGetClick() {
    (async () => {
      if (selectedBreed)
        setDogImage(
          await getRandomDogImageByBreed(selectedBreed, selectedSubBreed),
        );
      else setDogImage(await getRandomDogImage());
    })();
  }

  function handleRateClick() {
    console.log(rating);
    console.log("send rating to user DB");
  }

  function clearSelection() {
    setSelectedBreed(null);
    setSelectedSubBreed(null);
  }

  function handleRatingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedRating = e.target.value;
    const selectedRatingAsNumber = parseInt(selectedRating, 10);
    setRating(selectedRatingAsNumber);
  }

  function handleFavClick() {
    console.log("Send Dog to user favourites");
  }
  return (
    <div className="Dogs-wrapper">
      <h1 className="title">Dog Ceo Clone</h1>
      {dogImage && <img src={dogImage} className="Dogs-dog-image" />}
      <FiveStarRating onChange={handleRatingChange} />
      <span>{selection}</span>
      <span onClick={clearSelection}>Clear</span>
      <TableComponent
        key={"table-component"}
        theadData={["Breed", "Sub-Breed"]}
        tbodyData={tableDataJSX}
      />
      <button onClick={handleGetClick} className="Dogs-button">
        Get a new Dog!
      </button>
      <button onClick={handleRateClick} className="Dogs-button">
        Rate the Dog!
      </button>
      <button onClick={handleFavClick} className="Dogs-button">
        Add to favourites!
      </button>
    </div>
  );
}

export default Home;