import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { QueryParamsHelperService } from '../../../services/query-params-helper.service';
import { PositionFormService } from '../../../position-form/position-form.service';
import { CalcService } from '../../../services/calc-service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CesiumComponent } from '../cesium.component';
import { CesiumMapPosition } from './cesium.component.map-position';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapMipService } from '../../../api/map-mip.service';


xdescribe('CesiumComponent', () => {
  let component: CesiumComponent;
  let fixture: ComponentFixture<CesiumComponent>;
  let queryParamsHelperService: QueryParamsHelperService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule,
        BrowserAnimationsModule
      ],
      declarations: [CesiumComponent],
      providers: [QueryParamsHelperService, MapMipService, CalcService, PositionFormService]
    })
      .compileComponents();
  }));


  beforeEach(inject([QueryParamsHelperService], (_queryParamsHelperService: QueryParamsHelperService) => {
    fixture = TestBed.createComponent(CesiumComponent);
    component = fixture.componentInstance;
    queryParamsHelperService = _queryParamsHelperService;
    fixture.detectChanges();
  }));
  describe('map_position', () => {
    let map_position: CesiumMapPosition;

    beforeEach(() => {
      map_position = component.map_position;
      component.positionFormService.mapsCont = {};
      component.positionFormService.mapsCont.nativeElement = {};
      component.positionFormService.mapsCont.nativeElement['offsetWidth'] = 500;
      component.positionFormService.mapsCont.nativeElement['offsetHeight'] = 400;
    });

    it('queryParams should check if any changes on map position and set [width, height] if need', () => {
      spyOn(queryParamsHelperService, 'anySizeChange').and.returnValue(true);
      spyOn(queryParamsHelperService, 'anyPositionChange').and.returnValue(true);
      spyOn(queryParamsHelperService, 'querySize').and.returnValue([50, 50]);
      spyOn(queryParamsHelperService, 'queryPosition').and.returnValue([50, 50]);
      map_position.queryParams({});
      expect(component.container.nativeElement.style.left).toEqual('125px');
      expect(component.container.nativeElement.style.top).toEqual('100px');
    });
  });

});
