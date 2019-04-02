export class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;

    this.hash = () => this.name;
    this.equals = (other) => {
      if (other === null && this !== null) {
        return false;
      }
      return this.hash() === other.hash();
    }
  }

  compare(other) {
    return this.name.localeCompare(other.name);
  }
}
