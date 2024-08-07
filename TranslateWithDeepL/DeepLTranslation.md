# DeepL translation in simpl

This module can be used to translate texts in SimPL. This enables automated localization of texts within the control system.
To use it, an account must be created at DeepL to obtain a key. 

The free key allows the translation of 500 000 characters / month. It is therefore advisable to run the translation only once and save the result. 

This module need the next option "Rest API automation". For testing it is possible to archive a sample key from DATRON.

## Installation

To be able to use the module, it should be copied into the "Machine/Library" folder and this should be updated. Then the methods from other SimPL programs can be used. 

## Usage 

After the module has been installed, the commands can be used as follows:

```
sourceText = string[]={"Die DATRON AG grüßt seine Kunden und wünscht ihnen Erfolg."}                
tranlatedText = DeepLTranslate text=sourceText ZH