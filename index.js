import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";


const shape = [
  // "3"
  [0, 0, 1, 1, 1, 0, 0], // Week 1
  [0, 0, 0, 0, 1, 0, 0], // Week 2
  [0, 0, 1, 1, 1, 0, 0], // Week 3
  [0, 0, 0, 0, 1, 0, 0], // Week 4
  [0, 0, 1, 1, 1, 0, 0], // Week 5

  // "0"
  [0, 0, 1, 1, 1, 0, 0], // Week 6
  [0, 0, 1, 0, 1, 0, 0], // Week 7
  [0, 0, 1, 0, 1, 0, 0], // Week 8
  [0, 0, 1, 0, 1, 0, 0], // Week 9
  [0, 0, 1, 1, 1, 0, 0], // Week 10

  // "/"
  [0, 0, 0, 0, 1, 0, 0], // Week 11
  [0, 0, 0, 1, 0, 0, 0], // Week 12
  [0, 0, 1, 0, 0, 0, 0], // Week 13
  [0, 1, 0, 0, 0, 0, 0], // Week 14
  [1, 0, 0, 0, 0, 0, 0], // Week 15

  // "0"
  [0, 0, 1, 1, 1, 0, 0], // Week 16
  [0, 0, 1, 0, 1, 0, 0], // Week 17
  [0, 0, 1, 0, 1, 0, 0], // Week 18
  [0, 0, 1, 0, 1, 0, 0], // Week 19
  [0, 0, 1, 1, 1, 0, 0], // Week 20

  // "4"
  [0, 0, 1, 0, 1, 0, 0], // Week 21
  [0, 0, 1, 0, 1, 0, 0], // Week 22
  [0, 0, 1, 1, 1, 1, 0], // Week 23
  [0, 0, 0, 0, 1, 0, 0], // Week 24
  [0, 0, 0, 0, 1, 0, 0], // Week 25

  // "1"
  [0, 0, 0, 1, 0, 0, 0], // Week 26
  [0, 0, 1, 1, 0, 0, 0], // Week 27
  [0, 0, 0, 1, 0, 0, 0], // Week 28
  [0, 0, 0, 1, 0, 0, 0], // Week 29
  [0, 0, 1, 1, 1, 0, 0], // Week 30

  // "9"
  [0, 0, 1, 1, 1, 0, 0], // Week 31
  [0, 0, 1, 0, 1, 0, 0], // Week 32
  [0, 0, 1, 1, 1, 0, 0], // Week 33
  [0, 0, 0, 0, 1, 0, 0], // Week 34
  [0, 0, 1, 1, 1, 0, 0], // Week 35

  // "7"
  [0, 0, 1, 1, 1, 0, 0], // Week 36
  [0, 0, 0, 0, 1, 0, 0], // Week 37
  [0, 0, 0, 1, 0, 0, 0], // Week 38
  [0, 0, 1, 0, 0, 0, 0], // Week 39
  [0, 0, 1, 0, 0, 0, 0], // Week 40

  // "5"
  [0, 0, 1, 1, 1, 1, 0], // Week 41
  [0, 0, 1, 0, 0, 0, 0], // Week 42
  [0, 0, 1, 1, 1, 0, 0], // Week 43
  [0, 0, 0, 0, 1, 0, 0], // Week 44
  [0, 0, 1, 1, 1, 0, 0], // Week 45
];


const makeCommitsFromShape = async () => {
  const git = simpleGit();
  await git.init();

  for (let week = 0; week < shape.length; week++) {
    for (let day = 0; day < shape[week].length; day++) {
      if (shape[week][day] === 1) {
        const date = moment()
          .subtract(1, "y") // Start from one year ago (2024)
          .add(week, "w")
          .add(day, "d")
          .format();

        const data = { date: date };
        console.log(`Committing on: ${date}`);


        await jsonfile.writeFile(path, data);
        await git.add([path]);
        await git.commit(date, { "--date": date });
      }
    }
  }

  await git.push();
};

makeCommitsFromShape();
