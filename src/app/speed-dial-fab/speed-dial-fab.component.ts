import { Component, OnInit } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations
})
export class SpeedDialFabComponent implements OnInit {

  fabButtons = [
    {
      icon: 'delete',
      action: "navigate",
      name: 'Excluir',
      privileges: ['ADMIN']
    },
    {
      icon: 'notification_important',
      action: "openModalEdit",
      name: 'Lembrete',
      privileges: ['USER', 'ADMIN', 'GUEST']
    },
    {
      icon: 'calendar_today',
      action: "openModalEdit",
      name: 'Agenda',
      privileges: ['USER', 'ADMIN', 'GUEST', 'PUBLIC']
    },
    {
      icon: 'create',
      action: "openModalCall",
      name: 'Editar',
      privileges: ['ADMIN']
    },
    {
      icon: 'call',
      action: "openModalCall",
      name: 'Chamada',
      privileges: ['USER', 'ADMIN']
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';
  action: "test1";

  constructor() { }
  ngOnInit(): void {
  }

  async getListMenu(privileges) {
    
    try {
      let pvs = [];
      await Promise.all(this.fabButtons.map(async (p) => {
                      
        if (await this.listaDeMenus(p, privileges)) {
          pvs.push(p);
        } else {
            //  console.log('MENU ',p)
        }
  
    }));
    return pvs;
    } catch (e) {
      console.error(e);
            return e;
    }

  }
  async listaDeMenus(item, privileges) {    
    let isPlano = false;
    await Promise.all(item.privileges.map(async (p) => {
           if (privileges.indexOf(p) > -1) 
            isPlano = true;                    
    }));    
    return isPlano;
}
  

  navigate(event) {
    this[event]();
    this.onToggleFab();
  }
  test1(){
    alert("test");
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.getListMenu(['ADMIN']).then(data =>{
      this.buttons = data;
    });    
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = []; 
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }
}


