import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from './module.service';
import { ISite } from 'app/shared/model/site.model';
import { SiteService } from 'app/entities/site';

@Component({
    selector: 'jhi-module-update',
    templateUrl: './module-update.component.html',
    styleUrls:['./module.scss']
})
export class ModuleUpdateComponent implements OnInit {
    active=1;
    module: IModule;
    isSaving: boolean;
    invalid=true
    sites: ISite[];
    sitesDelete: ISite[]=[];
    constructor(
        protected jhiAlertService: JhiAlertService,
        protected moduleService: ModuleService,
        protected siteService: SiteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        const comp=this;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ module }) => {

            this.module = module;
            console.log($.all);

            /*  for(let x of this.sites){
                          x.selectedSite=false;
              }*/

        });
        this.siteService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISite[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISite[]>) => response.body)
            )
            .subscribe((res: ISite[]) =>{
                    this.sites = res;
                    this.sites=   this.sites.filter((a)=>a.etatSite==true);

                    for(let x of this.sites){
                        if( this.module.sites.length>0){
                            for(let a of this.module.sites){
                                if(x.id==a.id){
                                    x.selectedSite=true;
                                }
                            }}
                        console.log(this.sites)
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message));
        jQuery(document).ready(setTimeout(function() {




            // Form Switcher
            $('#form-switcher > button').on('click', function() {
                var btnData = $(this).data('form-layout');
                var btnActive = $('#form-elements-pane .admin-form.active');

                // Remove any existing animations and then fade current form out
                btnActive.removeClass('slideInUp').addClass('animated fadeOutRight animated-shorter');
                // When above exit animation ends remove leftover classes and animate the new form in
                btnActive.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    btnActive.removeClass('active fadeOutRight animated-shorter');
                    $('#' + btnData).addClass('active animated slideInUp animated-shorter')
                });
            });

            // Cache several DOM elements
            var pageHeader = $('.content-header').find('b');
            var adminForm = $('.admin-form');
            var options = adminForm.find('.option');
            var switches = adminForm.find('.switch');
            var buttons = adminForm.find('.button');
            var Panel = adminForm.find('.panel');

            // Form Skin Switcher
            $('#skin-switcher a').on('click', function() {
                var btnData = $(this).data('form-skin');

                $('#skin-switcher a').removeClass('item-active');
                $(this).addClass('item-active')

                adminForm.each(function(i, e) {
                    var skins = 'theme-primary theme-info theme-success theme-warning theme-danger theme-alert theme-system theme-dark';
                    var panelSkins = 'panel-primary panel-info panel-success panel-warning panel-danger panel-alert panel-system panel-dark';
                    $(e).removeClass(skins).addClass('theme-' + btnData);
                    Panel.removeClass(panelSkins).addClass('panel-' + btnData);
                    pageHeader.removeClass().addClass('text-' + btnData);
                });

                $(options).each(function(i, e) {
                    if ($(e).hasClass('block')) {
                        $(e).removeClass().addClass('block mt15 option option-' + btnData);
                    } else {
                        $(e).removeClass().addClass('option option-' + btnData);
                    }
                });
                $(switches).each(function(i, ele) {
                    if ($(ele).hasClass('switch-round')) {
                        if ($(ele).hasClass('block')) {
                            $(ele).removeClass().addClass('block mt15 switch switch-round switch-' + btnData);
                        } else {
                            $(ele).removeClass().addClass('switch switch-round switch-' + btnData);
                        }
                    } else {
                        if ($(ele).hasClass('block')) {
                            $(ele).removeClass().addClass('block mt15 switch switch-' + btnData);
                        } else {
                            $(ele).removeClass().addClass('switch switch-' + btnData);
                        }
                    }

                });
                buttons.removeClass().addClass('button btn-' + btnData);
            });

            setTimeout(function() {
                adminForm.addClass('theme-primary');
                Panel.addClass('panel-primary');
                pageHeader.addClass('text-primary');

                $(options).each(function(i, e) {
                    if ($(e).hasClass('block')) {
                        $(e).removeClass().addClass('block mt15 option option-primary');
                    } else {
                        $(e).removeClass().addClass('option option-primary');
                    }
                });
                $(switches).each(function(i, ele) {

                    if ($(ele).hasClass('switch-round')) {
                        if ($(ele).hasClass('block')) {
                            $(ele).removeClass().addClass('block mt15 switch switch-round switch-primary');
                        } else {
                            $(ele).removeClass().addClass('switch switch-round switch-primary');
                        }
                    } else {
                        if ($(ele).hasClass('block')) {
                            $(ele).removeClass().addClass('block mt15 switch switch-primary');
                        } else {
                            $(ele).removeClass().addClass('switch switch-primary');
                        }
                    }
                });
                buttons.removeClass().addClass('button btn-primary');
            }, 800);


        },150));
        jQuery(document).ready(setTimeout(function() {



            // Init Select2 - Basic Single
            $(".select2-single").select2();

            // Init Select2 - Basic Multiple
            $(".select2-multiple").select2({
                placeholder: "Select a state",
                allowClear: true
            });

            // Init Select2 - Contextuals (via html classes)
            $(".select2-primary").select2(); // select2 contextual - primary
            $(".select2-success").select2(); // select2 contextual - success
            $(".select2-info").select2();    // select2 contextual - info
            $(".select2-warning").select2(); // select2 contextual - warning

            // Init Bootstrap Maxlength Plugin
            $('input[maxlength]').maxlength({
                threshold: 15,
                placement: "right"
            });

            // Dual List Plugin Init
            var demo1 = $('.demo1').bootstrapDualListbox({
                nonSelectedListLabel: 'Options',
                selectedListLabel: 'Selected',
                preserveSelectionOnMove: 'moved',
                moveOnSelect: true,
                nonSelectedFilter: 'ion ([7-9]|[1][0-2])'
            });

            $("#demoform").submit(function() {
                alert("Options Selected: " + $('.demo1').val());
                return false;
            });

            // Init Twitter Typeahead.js
            var substringMatcher = function(strs) {
                return function findMatches(q, cb) {
                    var matches, substrRegex;

                    // an array that will be populated with substring matches
                    matches = [];

                    // regex used to determine if a string contains the substring `q`
                    substrRegex = new RegExp(q, 'i');

                    // iterate through the pool of strings and for any string that
                    // contains the substring `q`, add it to the `matches` array
                    $.each(strs, function(i, str) {
                        if (substrRegex.test(str)) {
                            // the typeahead jQuery plugin expects suggestions to a
                            // JavaScript object, refer to typeahead docs for more info
                            matches.push({
                                value: str
                            });
                        }
                    });

                    cb(matches);
                };
            };

            var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
                'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
                'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
                'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
                'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
                'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
            ];

            // Init Typeahead Plugin with state aray
            $('.typeahead').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            }, {
                name: 'states',
                displayKey: 'value',
                source: substringMatcher(states)
            });

            // DateRange plugin options
            var rangeOptions = {
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                    'Last 7 Days': [moment().subtract('days', 6), moment()],
                    'Last 30 Days': [moment().subtract('days', 29), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                },
                startDate: moment().subtract('days', 29),
                endDate: moment()
            }

            // Init DateRange plugin
            $('#daterangepicker1').daterangepicker();

            // Init DateRange plugin
            $('#daterangepicker2').daterangepicker(
                rangeOptions,
                function(start, end) {
                    $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                }
            );

            // Init DateRange plugin
            $('#inline-daterange').daterangepicker(
                rangeOptions,
                function(start, end) {
                    $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                }
            );

            // Init DateTimepicker - fields
            $('#datetimepicker1').datetimepicker();
            $('#datetimepicker2').datetimepicker();

            // Init DateTimepicker - inline + range detection
            $('#datetimepicker3').datetimepicker({
                defaultDate: "9/4/2014",
                inline: true,
            });

            // Init DateTimepicker - fields + Date disabled (only time picker)
            $('#datetimepicker5').datetimepicker({
                defaultDate: "9/25/2014",
                pickDate: false,
            });
            // Init DateTimepicker - fields + Date disabled (only time picker)
            $('#datetimepicker6').datetimepicker({
                defaultDate: "9/25/2014",
                pickDate: false,
            });
            // Init DateTimepicker - inline + Date disabled (only time picker)
            $('#datetimepicker7').datetimepicker({
                defaultDate: "9/25/2014",
                pickDate: false,
                inline: true
            });

            // Init Colorpicker plugin
            $('#demo_apidemo').colorpicker({
                color: bgPrimary
            });
            $('.demo-auto').colorpicker();

            // Init jQuery Tags Manager
            $(".tm-input").tagsManager({
                tagsContainer: '.tags',
                prefilled: ["Miley Cyrus", "Apple", "A Long Tag", "Na uh"],
                tagClass: 'tm-tag-info',
            });

            // Init Boostrap Multiselects
            $('#multiselect1').multiselect();
            $('#multiselect2').multiselect({
                includeSelectAllOption: true
            });
            $('#multiselect3').multiselect();
            $('#multiselect4').multiselect({
                enableFiltering: true,
            });
            $('#multiselect5').multiselect({
                buttonClass: 'multiselect dropdown-toggle btn btn-default btn-primary'
            });
            $('#multiselect6').multiselect({
                buttonClass: 'multiselect dropdown-toggle btn btn-default btn-info'
            });
            $('#multiselect7').multiselect({
                buttonClass: 'multiselect dropdown-toggle btn btn-default btn-success'
            });
            $('#multiselect8').multiselect({
                buttonClass: 'multiselect dropdown-toggle btn btn-default btn-warning'
            });

            // Init jQuery spinner init - default
            $("#spinner1").spinner();

            // Init jQuery spinner init - currency
            $("#spinner2").spinner({
                min: 5,
                max: 2500,
                step: 25,
                start: 1000,
                //numberFormat: "C"
            });

            // Init jQuery spinner init - decimal
            $("#spinner3").spinner({
                step: 0.01,
                numberFormat: "n"
            });

            // jQuery Time Spinner settings
            $.widget("ui.timespinner", $.ui.spinner, {
                options: {
                    // seconds
                    step: 60 * 1000,
                    // hours
                    page: 60
                },
                _parse: function(value) {
                    if (typeof value === "string") {
                        // already a timestamp
                        if (Number(value) == value) {
                            return Number(value);
                        }
                        return +Globalize.parseDate(value);
                    }
                    return value;
                },

                _format: function(value) {
                    return Globalize.format(new Date(value), "t");
                }
            });

            // Init jQuery Time Spinner
            $("#spinner4").timespinner();

            // Init jQuery Masked inputs
            $('.date').mask('99/99/9999');
            $('.time').mask('99:99:99');
            $('.date_time').mask('99/99/9999 99:99:99');
            $('.zip').mask('99999-999');
            $('.phone').mask('(999) 999-9999');
            $('.phoneext').mask("(999) 999-9999 x99999");
            $(".money").mask("999,999,999.999");
            $(".product").mask("999.999.999.999");
            $(".tin").mask("99-9999999");
            $(".ssn").mask("999-99-9999");
            $(".ip").mask("9ZZ.9ZZ.9ZZ.9ZZ");
            $(".eyescript").mask("~9.99 ~9.99 999");
            $(".custom").mask("9.99.999.9999");
            $('#multiselect6').on('change',function () {
                console.log($(this).val());
                this.test= $(this).val();
                console.log(this.test);
            })
            $('#multiselect6').on('change',function () {

                $.all= $(this).val();
                if(!$.all){
                    $.all=undefined
                    comp.active=0
                }else {
                    comp.active=1
                }
                console.log($.all);
            })
            $('#multiselect7').on('change',function () {

                $.all1= $(this).val();

                console.log($.all1);
            })
            $('#multiselect8').on('change',function () {

                $.all2= $(this).val();

                console.log($.all2);
            })
        },250));
        if(!this.module.id) {
            this.module.etatModule=1;
        }
    }

    previousState() {
        this.sites=[];
        $.all=undefined;
        window.history.back();
    }

    save() {

        if((!$.all   && this.sites.filter((a) => a.selectedSite == true).length==0)
        ){

            this.invalid=false
        }else {
            this.isSaving = true;
            if (this.module.id !== undefined) {
                if(!$.all   && this.sites.filter((a) => a.selectedSite == true).length!=0 && this.active==0){
                    this.invalid=false
                    this.isSaving = false;
                }else {

                    // this.module.sites=this.sites.filter((a)=>a.selectedSite==true);
                    //console.log(this.module.sites);

                    if ($.all) {
                        this.module.sites=[]
                        for (let b of $.all) {
                            this.module.sites.push(this.sites.filter((a) => a.codeSite == b)[0]);
                            console.log(this.sites.filter((a) => a.codeSite == b)[0])
                        }
                    }else {
                        this.module.sites=this.sites.filter((a)=>a.selectedSite==true);
                    }


                    console.log(this.module.sites)
                    this.subscribeToSaveResponse(this.moduleService.update(this.module));}

            } else {
                //this.module.sites=this.sites.filter((a)=>a.selectedSite==true);
                this.module.sites = [];
                if ($.all != undefined) {
                    for (let b of $.all) {
                        this.module.sites.push(this.sites.filter((a) => a.codeSite == b)[0]);
                    }
                }
                this.subscribeToSaveResponse(this.moduleService.create(this.module));
            }
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IModule>>) {
        result.subscribe((res: HttpResponse<IModule>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSiteById(index: number, item: ISite) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    changeEtatSite(a){
        a.selectedSite=!a.selectedSite;
        console.log(a);
    }
    changeEtat(){
        if(this.module.etatModule==1){
            this.module.etatModule=0
        }else{
            this.module.etatModule=1
        }

    }

}
