import {Component, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {JsonPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

type Phone = {
  id: number,
  name: string,
  price?: string,
  color?: string,
}

@Component({
  selector: 'app-root',
  imports: [JsonPipe, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly selectedId = signal(1);

  protected readonly selectedPhone = httpResource<Phone>(() =>
    `https://api.restful-api.dev/objects/${this.selectedId()}`,
    {
      parse: parsePhone
    }
  );
}

function parsePhone(json: any): Phone {
  return {
    id: parseInt(json.id),
    name: json.name,
    price: json.data?.price,
    color: json.data?.color,
  };
}
