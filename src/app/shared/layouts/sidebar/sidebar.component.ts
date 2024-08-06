import { Component } from '@angular/core';
import { CardComponent } from "../../component/card/card.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
