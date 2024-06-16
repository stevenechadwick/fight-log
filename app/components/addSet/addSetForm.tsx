'use client';

import { useState, useEffect } from "react";

import { Autocomplete, AutocompleteItem, Card, CardHeader, CardBody, Checkbox, Button, Textarea, Input } from "@nextui-org/react";

import { $Enums } from "@prisma/client";
import { FaPlus } from "react-icons/fa";
import { addSet } from "./addSet";

export default function AddSetForm({ onClose}) {
  // TODO make a type for this data
  const [formData, setFormData] = useState({
    player_character: '',
    opponent_character: '',
    g1_r1: false,
    g1_r2: false,
    g1_r3: false,
    g2: false,
    g2_r1: false,
    g2_r2: false,
    g2_r3: false,
    g3: false,
    g3_r1: false,
    g3_r2: false,
    g3_r3: false,
    rank: '',
    rating: '',
    notes: '',
  });

  const addGame = () => {
    if (!formData.g2) {
      setFormData((prev) => ({
        ...prev,
        g2: true,
      }));
    } else if (!formData.g3) {
      setFormData((prev) => ({
        ...prev,
        g3: true,
      }));
    }
  }

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || checked,
    }));
  };

  const handleAutoCompleteChange = (key, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: key,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addSet(formData);
      if (res) {
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
      {
        // TODO: Make a custom element for this dropdown
      }
      <div className="flex flex-row gap-1">
        <Autocomplete placeholder="Your Character" name="player_character" onSelectionChange={(key) => handleAutoCompleteChange(key, "player_character")}>
          {Object.keys($Enums.Character).map((character) => (
            <AutocompleteItem key={character} value={character}>
              {character}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete placeholder="Opponent Character" name="opponent_character" onSelectionChange={(key) => handleAutoCompleteChange(key, "opponent_character")}>
          {Object.keys($Enums.Character).map((character) => (
            <AutocompleteItem key={character} value={character}>
              {character}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <Card>
        <CardHeader>Game 1 Result</CardHeader>
        <CardBody>
          <div className="flex flex-row justify-between w-full gap-1">
            <Checkbox name="g1_r1" size="sm" onChange={handleChange}>Round 1 Win</Checkbox>
            <Checkbox name="g1_r2" size="sm" onChange={handleChange}>Round 2 Win</Checkbox>
            <Checkbox name="g1_r3" size="sm" onChange={handleChange} isDisabled={formData.g1_r1 && formData.g1_r2}>Round 3 Win</Checkbox>
          </div>
        </CardBody>
      </Card>
      {formData.g2 && (
        <Card>
          <CardHeader>Game 2 Result</CardHeader>
          <CardBody>
            <div className="flex flex-row justify-between w-full gap-1">
              <Checkbox name="g2_r1" size="sm" onChange={handleChange}>Round 1 Win</Checkbox>
              <Checkbox name="g2_r2" size="sm" onChange={handleChange}>Round 2 Win</Checkbox>
              <Checkbox name="g2_r3" size="sm" onChange={handleChange} isDisabled={formData.g2_r1 && formData.g2_r2}>Round 3 Win</Checkbox>
            </div>
          </CardBody>
        </Card>
      )}
      {formData.g3 && (
        <Card>
          <CardHeader>Game 3 Result</CardHeader>
          <CardBody>
            <div className="flex flex-row justify-between w-full gap-1">
              <Checkbox name="g3_r1" size="sm" onChange={handleChange}>Round 1 Win</Checkbox>
              <Checkbox name="g3_r2" size="sm" onChange={handleChange}>Round 2 Win</Checkbox>
              <Checkbox name="g3_r3" size="sm" onChange={handleChange} isDisabled={formData.g3_r1 && formData.g3_r2}>Round 3 Win</Checkbox>
            </div>
          </CardBody>
        </Card>
      )}
      {!(formData.g2 && formData.g3) && (
        <Button color="secondary" startContent={<FaPlus />} onPress={addGame}>Add Game</Button>
      )}
      <div className="flex flex-row gap-1">
        <Autocomplete placeholder="Rank" name="rank" onSelectionChange={(key) => handleAutoCompleteChange(key, "rank")}>
          {Object.keys($Enums.Leagues).map((rank) => (
            <AutocompleteItem key={rank} value={rank}>
              {rank}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Input name="rating" placeholder="Rating" onChange={handleChange} />
      </div>
      <Textarea name="notes" placeholder="Notes" onChange={handleChange} variant="bordered" maxLength={500} />
      <Button color="primary" type="submit">Submit</Button>
    </form>
  );
}