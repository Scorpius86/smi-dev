<?php
namespace smi\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ExportController extends Controller
{
    public function export($fileId){
        $fileName = $fileId.'.xlsx';
        $pathToTheFile = base_path() .'/public/'.$fileName;
        $fileContents = file_get_contents($pathToTheFile);
        $response = Response::make($fileContents, 200);

        register_shutdown_function('unlink', $pathToTheFile);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="report.xlsx"');
        header('Cache-Control: max-age=0');
        header("Content-Length: ".filesize($pathToTheFile));
        return $response;
    }
    public function exportIntersectionPoints(Request $request){
        $sections =  $request['sections'];
        $area =  $request['area'];
        //return $sections;
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $sheet->mergeCells('A1:C1');
        $sheet->mergeCells('A5:C5');        

        $sheet->getColumnDimension('A')->setWidth(2);
        $sheet->getColumnDimension('B')->setWidth(50);
        $sheet->getColumnDimension('C')->setWidth(18);

        $sheet->setCellValue('A1', 'Custom Area 1');
        $sheet->setCellValue('C2','Area '.$area.' Km2');
        $sheet->setCellValue('A5','Infraestructura');
        
        $styleTitle = [
            'font' => [
                'bold' => true,
                'size' => 20,
                'color' => [
                    'argb' => '808080',
                ]
            ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
            ]
        ];

        $styleInfoTitle = [
            'font' => [
                'size' => 10,
                'color' => [
                    'argb' => '595959',
                ]
            ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT,
            ]
        ];

        $styleSubTitle = [
            'font' => [
                'bold' => true,
                'size' => 16,
                'color' => [
                    'argb' => '000000',
                ]
            ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'D9D9D9',
                ],
            ]
        ];

        $styleHeaderTable = [
            'font' => [
                'bold' => true,
                'size' => 12,
                'color' => [
                    'argb' => '000000',
                ]
            ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
            ],
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                ],
            ],
        ];

        $style = $sheet->getStyle('A1');
        $style->applyFromArray($styleTitle);

        $style = $sheet->getStyle('C2');        
        $style->applyFromArray($styleInfoTitle);

        $style = $sheet->getStyle('A5');
        $style->applyFromArray($styleSubTitle);

        $numRow = 7;
        foreach ($sections as $section) {
            $sheet->mergeCells('A'.$numRow.':B'.$numRow);
            $sheet->setCellValue('A'.$numRow,$section['name']);
            $sheet->setCellValue('C'.$numRow,'Cantidad');
            $style = $sheet->getStyle('A'.$numRow.':C'.$numRow);
            $style->applyFromArray($styleHeaderTable);
            $numRow = $numRow + 1;

            foreach ($section['sections'] as $sectionChild) {
                $sheet->getRowDimension($numRow)->setRowHeight(5);
                $numRow = $numRow + 1;

                $color = substr($sectionChild['color'],1);
                $style = $sheet->getStyle('A'.$numRow)->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
                $style = $sheet->getStyle('A'.$numRow)->getFill()->getStartColor()->setARGB($color);

                $sheet->setCellValue('B'.$numRow,$sectionChild['name']);
                $sheet->setCellValue('C'.$numRow,$sectionChild['count']);
                $style = $sheet->getStyle('B'.$numRow.':C'.$numRow);
                $numRow = $numRow + 1;
            }

            $numRow = $numRow + 2;
        }        
        
        $fileName = uniqid();
        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save($fileName.'.xlsx');
        return $fileName;
    }
}
?>