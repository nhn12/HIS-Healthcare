/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-07-22 01:20:39
 * @modify date 2018-07-22 01:20:39
 * @desc Data table optional.
*/
import { AppConstants } from '../../../variable-defination/app-constanst';

export class Optional {
    // Url get remote data
    private _url: string;

    // Data exists
    private _data: any;

    // Title data table
    private _title: string;

    // Disable sort
    private _disableSort: boolean = false;

    // Disable quick search
    private _disableSearch: boolean = false;

    // Disable delete record
    private _disableDelete: boolean = false;

    // Disable edit record
    private _disableEdit: boolean = false;

    // Quantity record per page    
    private _quantityPerPage: number = AppConstants.QUANTITY_PER_PAGE;

    // Add button
    private _isAdd: boolean;

    private _addButtonText: string = "Thêm";

    private _overrideAddClick: any;
    

    /**
     * Getter url
     * @return {string}
     */
    public get url(): string {
        return this._url;
    }

    /**
     * Getter data
     * @return {any}
     */
    public get data(): any {
        return this._data;
    }

    /**
     * Getter title
     * @return {string}
     */
    public get title(): string {
        return this._title;
    }

    /**
     * Getter disableSort
     * @return {boolean }
     */
    public get disableSort(): boolean  {
        return this._disableSort;
    }

    /**
     * Getter disableSearch
     * @return {boolean }
     */
    public get disableSearch(): boolean  {
        return this._disableSearch;
    }

    /**
     * Getter disableDelete
     * @return {boolean }
     */
    public get disableDelete(): boolean  {
        return this._disableDelete;
    }

    /**
     * Getter disableEdit
     * @return {boolean }
     */
    public get disableEdit(): boolean  {
        return this._disableEdit;
    }

    /**
     * Getter quantityPerPage
     * @return {number }
     */
    public get quantityPerPage(): number  {
        return this._quantityPerPage;
    }

    /**
     * Setter url
     * @param {string} value
     */
    public set url(value: string) {
        this._url = value;
    }

    /**
     * Setter data
     * @param {any} value
     */
    public set data(value: any) {
        this._data = value;
    }

    /**
     * Setter title
     * @param {string} value
     */
    public set title(value: string) {
        this._title = value;
    }

    /**
     * Setter disableSort
     * @param {boolean } value
     */
    public set disableSort(value: boolean ) {
        this._disableSort = value;
    }

    /**
     * Setter disableSearch
     * @param {boolean } value
     */
    public set disableSearch(value: boolean ) {
        this._disableSearch = value;
    }

    /**
     * Setter disableDelete
     * @param {boolean } value
     */
    public set disableDelete(value: boolean ) {
        this._disableDelete = value;
    }

    /**
     * Setter disableEdit
     * @param {boolean } value
     */
    public set disableEdit(value: boolean ) {
        this._disableEdit = value;
    }

    /**
     * Setter quantityPerPage
     * @param {number } value
     */
    public set quantityPerPage(value: number ) {
        this._quantityPerPage = value;
    }

    public get isAdd(): boolean {
        return this._isAdd;
    }

    public set isAdd(value: boolean) {
        this._isAdd = value;
    }

    /**
     * Getter addButtonText
     * @return {string }
     */
	public get addButtonText(): string  {
		return this._addButtonText;
	}

    /**
     * Getter overrideAddClick
     * @return {any}
     */
	public get overrideAddClick(): any {
		return this._overrideAddClick;
	}

    /**
     * Setter addButtonText
     * @param {string } value
     */
	public set addButtonText(value: string ) {
		this._addButtonText = value;
	}

    /**
     * Setter overrideAddClick
     * @param {any} value
     */
	public set overrideAddClick(value: any) {
		this._overrideAddClick = value;
	}
}
