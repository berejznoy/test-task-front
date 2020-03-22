import Vue from "vue"

Vue.mixin({
	filters: {
		$toMegaBite(value) {
			return (value / 1024).toFixed(2)
		},
		$getImage(value) {
			const extension = value.substr(1);
			const imageList = {
				jpg: "/icons/attach.svg",
				pdf: "/icons/file.svg",
				doc: "/icons/document.svg",
				docx: "/icons/document.svg",
				xls: "/icons/spreadsheet.svg",
				txt: "/icons/spreadsheet.svg",
				xlsx: "/icons/spreadsheet.svg",
				csv: "/icons/spreadsheet.svg",
			};
			return imageList[extension] || "/icons/unknown.svg"
		}
	}
});
