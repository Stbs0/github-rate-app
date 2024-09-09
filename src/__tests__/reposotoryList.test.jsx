import { useState } from "react";
import { RepositoryListContainer } from "../components/RepositoryList";
import {
  render,
  fireEvent,
  screen,
  within,
} from "@testing-library/react-native";

const expectToHave = (within, repo, key) => within(repo).getByText(key);

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      //   first repo
      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      const fullName1 = expectToHave(
        within,
        firstRepositoryItem,
        "jaredpalmer/formik",
      );
      const description1 = expectToHave(
        within,
        firstRepositoryItem,
        "Build forms in React, without the tears",
      );
      const language1 = expectToHave(within, firstRepositoryItem, "TypeScript");
      const forks1 = expectToHave(within, firstRepositoryItem, "1.6k");
      const stars1 = expectToHave(within, firstRepositoryItem, "21.9k");
      const rating1 = expectToHave(within, firstRepositoryItem, "88");
      const reviews1 = expectToHave(within, firstRepositoryItem, "3");

      //test first repo
      expect(fullName1).toHaveTextContent("jaredpalmer/formik");
      expect(description1).toHaveTextContent(
        "Build forms in React, without the tears",
      );
      expect(language1).toHaveTextContent("TypeScript");
      expect(forks1).toHaveTextContent("1.6k");
      expect(stars1).toHaveTextContent("21.9k");
      expect(rating1).toHaveTextContent("88");
      expect(reviews1).toHaveTextContent("3");

      //   second repo
      const fullName2 = expectToHave(
        within,
        secondRepositoryItem,
        "async-library/react-async",
      );
      const description2 = expectToHave(
        within,
        secondRepositoryItem,
        "Flexible promise-based React data loader",
      );
      const language2 = expectToHave(
        within,
        secondRepositoryItem,
        "JavaScript",
      );
      const forks2 = expectToHave(within, secondRepositoryItem, "69");
      const stars2 = expectToHave(within, secondRepositoryItem, "1.8k");
      const rating2 = expectToHave(within, secondRepositoryItem, "72");
      const reviews2 = expectToHave(within, secondRepositoryItem, "3");

      //test second repo
      expect(fullName2).toHaveTextContent("async-library/react-async");
      expect(description2).toHaveTextContent(
        "Flexible promise-based React data loader",
      );
      expect(language2).toHaveTextContent("JavaScript");
      expect(forks2).toHaveTextContent("69");
      expect(stars2).toHaveTextContent("1.8k");
      expect(rating2).toHaveTextContent("72");
      expect(reviews2).toHaveTextContent("3");
    });
  });
});


